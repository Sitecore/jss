const http = require('http');
const path = require('path');

const server = http.createServer(requestListener);

server.listen(5000, 'localhost', () => {
  console.log(`http renderer listening ${server.address().address} port ${server.address().port}`);
});

function requestListener(req, res) {
  readRequestBodyAsJson(req, (bodyJson) => {
    let hasSentResult = false;
    const callback = (errorValue, successValue) => {
      if (!hasSentResult) {
        hasSentResult = true;
        if (errorValue) {
          respondWithError(res, errorValue);
        } else if (typeof successValue !== 'string') {
          // Arbitrary object/number/etc - JSON-serialize it
          let successValueJson = {};
          try {
            successValueJson = JSON.stringify(successValue);
          } catch (ex) {
            // JSON serialization error - pass it back to http caller.
            respondWithError(res, ex);
            return;
          }
          res.setHeader('Content-Type', 'application/json');
          res.end(successValueJson);
        } else {
          // String - can bypass JSON-serialization altogether
          res.setHeader('Content-Type', 'text/plain');
          res.end(successValue);
        }
      }
    };
    // Support streamed responses
    Object.defineProperty(callback, 'stream', {
      enumerable: true,
      get() {
        if (!hasSentResult) {
          hasSentResult = true;
          res.setHeader('Content-Type', 'application/octet-stream');
        }
        return res;
      },
    });
    try {
      const resolvedPath = path.resolve(process.cwd(), 'build', bodyJson.moduleName);
      console.log('resolvedPath', resolvedPath);
      const invokedModule = require(resolvedPath);
      const func = bodyJson.functionName ? invokedModule[bodyJson.functionName] : invokedModule;
      console.log('functionName', bodyJson.functionName);
      console.log('args', bodyJson.args);
      if (!func) {
        throw new Error(
          `The module "${resolvedPath}" has no export named "${bodyJson.functionName}"`
        );
      }
      func(callback, ...bodyJson.args);
    } catch (synchronousException) {
      console.log(synchronousException);
      callback(synchronousException, null);
    }
  });
}

function readRequestBodyAsJson(request, callback) {
  let requestBodyAsString = '';
  request.on('data', (chunk) => {
    requestBodyAsString += chunk;
  });
  request.on('end', () => {
    callback(JSON.parse(requestBodyAsString));
  });
}
function respondWithError(res, errorValue) {
  console.error(errorValue);
  res.statusCode = 500;
  res.end(
    JSON.stringify({
      errorMessage: errorValue.message || errorValue,
      errorDetails: errorValue.stack || null,
    })
  );
}
