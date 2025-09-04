import fs from 'fs';
import chalk from 'chalk';
import path from 'path';

/**
 * Force to use `crlf` line endings, we are using `crlf` across the project.
 * Replace: `lf` (\n), `cr` (\r)
 * @param {string} content
 */
export function editLineEndings(content: string) {
  return content.replace(/\r|\n/gm, '\r\n');
}

/**
 * Creates a file relative to the specified path if the file doesn't exist.
 * Creates directories as needed.
 * Does not overwrite existing files.
 * @param {string} filePath - the file path
 * @param {string} fileContent - the file content
 * @returns {string} the file path if the file was created, otherwise null
 */
export function scaffoldFile(filePath: string, fileContent: string): string | null {
  const outputDir = path.dirname(filePath);

  if (fs.existsSync(filePath)) {
    console.log(chalk.red(`Skipping creating ${filePath}; already exists.`));
    return null;
  }

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(filePath, editLineEndings(fileContent), 'utf8');
  console.log(chalk.green(`File ${filePath} has been scaffolded.`));

  return filePath;
}
