const recast = require('recast');

/**
 * Webpack loader to strip functions from the source code
 * @param {string} source file source code
 * @returns {string} output file source code with stripped functions
 */
module.exports = function (source) {
  // Parse the source code into an AST (Abstract Syntax Tree)
  const ast = recast.parse(source, {
    parser: require('recast/parsers/babel-ts'),
  });

  // List of functions to strip from the AST
  const functionsToStrip = ['getServerSideProps', 'getStaticProps'];

  function traverseAst(path) {
    if (path.node.declaration.declarations) {
      path.node.declaration.declarations.forEach((declaration) => {
        // Check if the function is in the list of functions to strip
        if (functionsToStrip.includes(declaration.id.name)) {
          // Strip the function from the AST
          path.prune();

          // Remove the function from the list of functions to strip
          functionsToStrip.splice(functionsToStrip.indexOf(declaration.id.name), 1);
        }
      });
    }

    if (functionsToStrip.length === 0) {
      // We have pruned all the functions we need to, so we can stop traversing the AST
      return false;
    }

    // Continue traversing the AST
    this.traverse(path);
  }

  // Traverse the AST and strip the functions
  recast.visit(ast, {
    // Visit the export named declaration
    visitExportNamedDeclaration: traverseAst,
  });

  // Generate the output code
  const output = recast.print(ast).code;

  return output;
};
