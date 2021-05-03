/**
 * FileCopyrightText: Jay <jpm4vr@gmail.com>.
 * LicenseIdentifier: MIT
 */

const fileSystem = require("fs");
const inquirer = require("inquirer");
const ModalObj = require("./Modal");
const FrontendTokenCategories = require("./FrontendTokenCategories");
const Log = require("./Log");

class StylebookConfig {
  constructor() {
    this.overwriteFile = async () => await StylebookConfig._overwriteFile();

    this.buildConfig = async () => await StylebookConfig._buildConfig();

    this.writeJsonfile = (folderPath, filename, jsonObj) => StylebookConfig._writeJsonFile(folderPath, filename, jsonObj);

    this.getFolderdir = (jsonObj) => StylebookConfig._getFolderdir();

    this.getFilename = (flag) => StylebookConfig._fileName(flag);

    this.isFileexists = (thisObj) => StylebookConfig._isFileexists(thisObj);
  }

  static _fileName = (flag) => {
    if (flag) {
      return `frontend-token-definition-${Math.floor(Date.now() / 1000)}.json`;
    } else {
      return "frontend-token-definition.json";
    }
  };

  static _writeJsonFile = (folderPath, filename, jsonObj) => {
    try {
      let filePath = fileSystem.existsSync(folderPath + "\\src") ? folderPath + "\\src\\WEB-INF\\" + filename : folderPath + "\\" + filename;
      fileSystem.writeFileSync(`${filePath}`, JSON.stringify(jsonObj, null, 4));
      Log.message(
        `\x1b[34m${filePath}\x1b[0m file generated${
          fileSystem.existsSync(folderPath + "\\src") ? "." : ",\n> Move \x1b[34m" + filename + "\x1b[0m file inside [theme-name]-theme\\src\\WEB-INF\\ directory and deploy theme."
        }\n\n> Thank You!!`
      );
    } catch (e) {
      Log.message(e.message, "e");
    }
  };

  static _buildConfig = async () => {
    let modalObj = new ModalObj();
    Log.print(JSON.stringify(modalObj._frontendTokenDefinitionJson, null, 2));
    return await new FrontendTokenCategories(modalObj._frontendTokenDefinitionJson).init();
  };

  static _overwriteFile = async () => {
    let overwriteChoices = ["Overwrite.", "Keep existing & create a new file.", "Abort"];
    let overwriteAns = await inquirer
      .prompt([
        {
          type: "rawlist",
          name: "overwrite",
          message: "\x1b[34mfrontend-token-definition.json\x1b[0m already exists! What would you like to do?",
          choices: overwriteChoices,
        },
      ])
      .then((answers) => answers);

    return {
      status: overwriteChoices.indexOf(overwriteAns.overwrite) !== 2 ? true : false,
      flag: overwriteChoices.indexOf(overwriteAns.overwrite),
    };
  };

  static _getFolderdir = async () => {
    return await inquirer
      .prompt([
        {
          type: "text",
          name: "folderdir",
          message: `Enter the path to your [Theme Name]-theme directory:`,
          default: `${process.cwd()}\\[Theme Name]-theme\\`,
        },
      ])
      .then((answers) => answers.folderdir);
  };

  static _isFileexists = async (thisObj) => {
    if (fileSystem.existsSync(process.cwd() + "\\src\\WEB-INF\\frontend-token-definition.json")) {
      let isoverwrite = await thisObj.overwriteFile();
      return { status: true, dir: process.cwd(), isOverwrite: isoverwrite };
    } else {
      let getFolderdir = await thisObj.getFolderdir();
      if (fileSystem.existsSync(getFolderdir + "\\src\\WEB-INF\\frontend-token-definition.json") || fileSystem.existsSync(getFolderdir + "\\frontend-token-definition.json")) {
        let isoverwrite = await thisObj.overwriteFile();
        return { status: true, dir: getFolderdir, isOverwrite: isoverwrite };
      } else {
        return { status: false, dir: getFolderdir, isOverwrite: { status: false, flag: 0 } };
      }
    }
  };

  init = async () => {
    Log.message(`Welcome to stylebook generator for Liferay DXP and Portal CE 7.3.`);
    try {
      let thisObj = this;

      let isFileexists = await thisObj.isFileexists(thisObj);

      if (isFileexists.isOverwrite.flag != 2) {
        let isDone = await thisObj.buildConfig();
        if (isDone && isDone.status) {
          thisObj.writeJsonfile(isFileexists.dir, thisObj.getFilename(isFileexists.isOverwrite.flag), isDone.jsonObj);
        }
      } else {
        Log.message("Thank You!!");
      }
    } catch (e) {
      Log.message(e, "e");
    }
  };
}
module.exports = new StylebookConfig();
