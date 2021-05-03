/**
 * FileCopyrightText: Jay <jpm4vr@gmail.com>.
 * LicenseIdentifier: MIT
 */

const inquirer = require("inquirer");
const ModalObj = require("./Modal");
const FrontendTokenSets = require("./FrontendTokenSets");
const Log = require("./Log");

class FrontendTokenCategories {
  constructor(configJson) {
    this.finalConfig = configJson;

    this.setObject = (finalConfig, modalObj, getAns) => FrontendTokenCategories._setObject(finalConfig, modalObj, getAns);

    this.addFrontendCategory = () => FrontendTokenCategories._addFrontendCategory();

    this.addFrontendTokenSet = (categoryLabel) => FrontendTokenCategories._addFrontendTokenSet(categoryLabel);
  }

  static _setObject = (curObj, modalObj, ansObj) => {
    return curObj.frontendTokenCategories.push({
      ...modalObj,
      ...ansObj,
    });
  };

  static _addFrontendTokenSet = async (categoryLabel) => {
    return await inquirer
      .prompt([
        {
          type: "confirm",
          name: "addfrontendtokensets",
          message: `Would you like to add new frontendTokenSets for \x1b[34m"${categoryLabel}"\x1b[0m frontendTokenCategories?`,
        },
      ])
      .then((answers) => answers.addfrontendtokensets);
  };

  static _addFrontendCategory = async () => {
    return await inquirer
      .prompt([
        {
          type: "confirm",
          name: "addfrontendcategory",
          message: `Would you like to add new "frontendTokenCategories"?`,
        },
      ])
      .then((answers) => answers.addfrontendcategory);
  };

  init = async () => {
    try {
      let thisObj = this;

      let modalObj = new ModalObj()._frontendTokenCategories;

      let questions = new ModalObj()._frontendTokenCategoriesQuestions;

      let getAns = await inquirer.prompt(questions).then((answers) => answers);

      thisObj.setObject(thisObj.finalConfig, modalObj, getAns);

      Log.print(JSON.stringify(thisObj.finalConfig, null, 2));

      let isaddFrontendTokenSet = await thisObj.addFrontendTokenSet(getAns.label);

      if (isaddFrontendTokenSet) {
        Log.line(">");
        let frontendTokenSets = new FrontendTokenSets(thisObj.finalConfig);
        let isDone = await frontendTokenSets.init();
        if (isDone && isDone.status) {
          Log.line("<");
          let addNewcategory = await thisObj.addFrontendCategory();
          if (addNewcategory) {
            Log.line("-");
            await thisObj.init();
          } else {
            return { status: true, jsonObj: thisObj.finalConfig };
          }
        }
      } else {
        Log.line("<");
        let addNewcategory = await thisObj.addFrontendCategory();
        if (addNewcategory) {
          Log.line("-");
          await thisObj.init();
        } else {
          return { status: true, jsonObj: thisObj.finalConfig };
        }
      }
    } catch (e) {
      Log.message(e, "e");
    }
  };
}

module.exports = FrontendTokenCategories;
