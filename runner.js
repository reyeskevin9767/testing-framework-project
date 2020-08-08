const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const render = require('./render');

const forbiddenDirs = ['node_modules'];

//* Collects Files
class Runner {
  constructor() {
    this.testFiles = [];
  }

  // Run test files
  async runTests() {
    for (let file of this.testFiles) {
      console.log(chalk.gray(`---- ${file.shortName}`));
      const beforeEaches = [];

      // Render HTML files
      global.render = render;

      // Place BeforeEach in an array
      global.beforeEach = (fn) => {
        beforeEaches.push(fn);
      };

      // Run BeforeEaches before running it function
      global.it = async (desc, fn) => {
        beforeEaches.forEach((func) => func());
        try {
          await fn();
          console.log(chalk.green(`\tOK - ${desc}`));
        } catch (err) {
          const message = err.message.replace(/\n/g, '\n\t\t');
          console.log(chalk.red(`\tX - ${desc}`));
          console.log(chalk.red('\t', message));
        }
      };
      // Check if any errors occur in file
      try {
        require(file.name);
      } catch (err) {
        console.log(chalk.red(err));
      }
    }
  }

  // Collect all test.js files
  async collecFiles(targetPath) {
    const files = await fs.promises.readdir(targetPath);

    // Determine if file or folder
    for (let file of files) {
      const filepath = path.join(targetPath, file);
      const stats = await fs.promises.lstat(filepath);

      // Any file that ends with tests.js is added ot an array
      if (stats.isFile() && file.includes('.test.js')) {
        this.testFiles.push({ name: filepath, shortName: file });
      } else if (stats.isDirectory() && !forbiddenDirs.includes(file)) {
        // Look thorugh folders
        const childFiles = await fs.promises.readdir(filepath);
        files.push(...childFiles.map((f) => path.join(file, f)));
      }
    }
  }
}

module.exports = Runner;
