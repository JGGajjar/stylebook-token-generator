/**
 * FileCopyrightText: JayGajjar[AG1806] <jpm4vr@gmail.com>.
 * LicenseIdentifier: MIT
 */

const inquirer = require("inquirer");
const ModalObj = require("./Modal");
const FrontendTokenSets = require("./FrontendTokenSets");
const Log = require("./Log");

class FrontendTokenCategories {
  constructor(configJson) {
    this.finalConfig = configJson;

    this.setObject = (finalConfig, ModalObj, getAns) => FrontendTokenCategories._setObject(finalConfig, ModalObj, getAns);

    this.addFrontendCategory = () => FrontendTokenCategories._addFrontendCategory();

    this.addFrontendTokenSet = (categoryLabel) => FrontendTokenCategories._addFrontendTokenSet(categoryLabel);
  }

  static _setObject = (curObj, ModalObj, ansObj) => {
    return curObj.frontendTokenCategories.push({
      ...ModalObj,
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

      let modalObj = ModalObj._frontendTokenCategories;

      let questions = ModalObj._frontendTokenCategoriesQuestions;

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
