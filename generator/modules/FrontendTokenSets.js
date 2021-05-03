/**
 * FileCopyrightText: Jay <jpm4vr@gmail.com>.
 * LicenseIdentifier: MIT
 */

const inquirer = require("inquirer");
const ModalObj = require("./Modal");
const FrontendTokens = require("./FrontendTokens");
const Log = require("./Log");

class FrontendTokenSets {
  constructor(configJson) {
    this.finalConfig = configJson;

    this.setObject = (curObj, modalObj, ansObj) => FrontendTokenSets.setObject(curObj, modalObj, ansObj);

    this.addFrontendTokens = (categoryLabel) => FrontendTokenSets.addFrontendTokens(categoryLabel);

    this.addFrontendTokenSets = () => FrontendTokenSets.addFrontendTokenSets();
  }

  static setObject = (curObj, modalObj, ansObj) => {
    return curObj.frontendTokenCategories[curObj.frontendTokenCategories.length - 1].frontendTokenSets.push({
      ...modalObj,
      ...ansObj,
    });
  };

  static addFrontendTokens = async (categoryLabel) => {
    return await inquirer
      .prompt([
        {
          type: "confirm",
          name: "addfrontendtokens",
          message: `Would you like to add new "frontendTokens" for \x1b[34m"${categoryLabel}"\x1b[0m "frontendTokenSets"?`,
        },
      ])
      .then((answers) => answers.addfrontendtokens);
  };

  static addFrontendTokenSets = async () => {
    return await inquirer
      .prompt([
        {
          type: "confirm",
          name: "addfrontendTokenSets",
          message: `Would you like to add new "frontendTokenSets"?`,
        },
      ])
      .then((answers) => answers.addfrontendTokenSets);
  };

  init = async () => {
    try {
      let thisObj = this;

      let modalObj = new ModalObj()._frontendTokenSets;

      let questions = new ModalObj()._frontendTokenSetsQuestions;

      let getAns = await inquirer.prompt(questions).then((answers) => answers);

      thisObj.setObject(thisObj.finalConfig, modalObj, getAns);

      Log.print(JSON.stringify(thisObj.finalConfig, null, 2));

      let isaddFrontendTokens = await thisObj.addFrontendTokens(getAns.label);

      if (isaddFrontendTokens) {
        Log.line(">");

        let frontendTokens = new FrontendTokens(thisObj.finalConfig);

        let isDone = await frontendTokens.init();

        if (isDone && isDone.status) {
          Log.line("<");

          let isaddFrontendTokenSets = await thisObj.addFrontendTokenSets();

          if (isaddFrontendTokenSets) {
            await thisObj.init();
          } else {
            return { status: true, jsonObj: thisObj.finalConfig };
          }
        }
      } else {
        return { status: true, jsonObj: thisObj.finalConfig };
      }
    } catch (e) {
      Log.message(e, "e");
    }
  };
}

module.exports = FrontendTokenSets;
