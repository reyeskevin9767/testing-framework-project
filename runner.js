const fs = require('fs');
const path = require('path');

//* Collects Files
class Runner {
  constructor() {
    this.testFiles = [];
  }

  // Run test files
  async runTests() {
    for (let file of this.testFiles) {
      require(file.name);
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
        this.testFiles.push({ name: filepath });
      } else if (stats.isDirectory()) {
        // Look thorugh folders
        const childFiles = await fs.promises.readdir(filepath);
        files.push(...childFiles.map((f) => path.join(file, f)));
      }
    }
  }
}

module.exports = Runner;
