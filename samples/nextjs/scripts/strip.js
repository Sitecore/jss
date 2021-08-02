const fs = require('fs');
const os = require('os');
const path = require('path');

const EXCLUDE_DIR_REGEXP = /(^|\\)(node_modules|\.next|out|\.generated)(\\|$)/gi;
const INCLUDE_FILE_REGEXP = /\.(js|ts?x)$/g;

const START_REGEXP = /\/\/ #START_STRIP/g;
const END_REGEXP = /\/\/ #END_STRIP/;

/**
 * Remove part of code which inside the STRIP block
 * @param {string} file 
 */
const compile = (file) => {
  const content = fs.readFileSync(file, 'utf8');

  let shouldRemove = false;

  const lines = content.split(os.EOL).filter(line => {
    if (START_REGEXP.test(line)) {
      shouldRemove = true;
    }

    if (END_REGEXP.test(line)) {
      shouldRemove = false;

      return shouldRemove;
    }

    return !shouldRemove;
  });

  fs.writeFileSync(file, lines.join('\r\n'));
};

/**
 * Iterate files/directories in provided directory
 * @param {string} dir current directory
 * @param {Function} done called when all files are iterated in directory
 */
const iterate = function (dir, done) {
  let results = [];

	try {
		const list = fs.readdirSync(dir);

		let i = 0;
	
		const nextFile = () => {
			let file = list[i++];
	
			if (EXCLUDE_DIR_REGEXP.test(file)) {
				return nextFile();
			}
	
			if (!file) return done(null, results);
	
			file = path.resolve(dir, file);
	
			const stat = fs.statSync(file);
	
			if (stat && stat.isDirectory()) {
				iterate(file, (err, res) => {
					results = results.concat(res);
					nextFile();
				});
	
				return;
			}
	
			if (!INCLUDE_FILE_REGEXP.test(file)) return nextFile();
	
			compile(file);
	
			results.push(file);
	
			nextFile();
		};
	
		nextFile();
	} catch (error) {
		done(error);
	}
};

module.exports = () => {
	iterate(path.resolve(__dirname, '..'), (err, results) => {
		if (err) throw err;
		console.log(results);
	});
}
