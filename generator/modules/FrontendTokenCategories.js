/**
 * FileCopyrightText: JayGajjar <jaygajjar29@gmail.com>.
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

  static _setObject = (curObj, ModalObj, ansObj) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    curObj.frontendTokenCategories.push({
      ...ModalObj,
      ...ansObj,
    });

  static _addFrontendTokenSet = async (categoryLabel) =>
    await inquirer
      .prompt([
        {
          type: "confirm",
          name: "addfrontendtokensets",
          message: `Would you like to add new frontendTokenSets for \x1b[34m"${categoryLabel}"\x1b[0m frontendTokenCategories?`,
        },
      ])
      .then((answers) => answers.addfrontendtokensets);

  static _addFrontendCategory = async () =>
    await inquirer
      .prompt([
        {
          type: "confirm",
          name: "addfrontendcategory",
          message: `Would you like to add new "frontendTokenCategories"?`,
        },
      ])
      .then((answers) => answers.addfrontendcategory);

  init = async () => {
    try {
      const thisObj = this;

      const modalObj = ModalObj._frontendTokenCategories;

      const questions = ModalObj._frontendTokenCategoriesQuestions;

      const getAns = await inquirer.prompt(questions).then((answers) => answers);

      thisObj.setObject(thisObj.finalConfig, modalObj, getAns);

      Log.print(JSON.stringify(thisObj.finalConfig, null, 2));

      const isaddFrontendTokenSet = await thisObj.addFrontendTokenSet(getAns.label);

      if (isaddFrontendTokenSet) {
        Log.line(">");

        const frontendTokenSets = new FrontendTokenSets(thisObj.finalConfig);

        await frontendTokenSets.init();

        Log.line("<");

        const addNewcategory = await thisObj.addFrontendCategory();

        if (addNewcategory) {
          Log.line("-");
          await thisObj.init();
        } else {
          return await Promise.resolve({ status: true, jsonObj: thisObj.finalConfig });
        }
      } else {
        Log.line("<");

        const addNewcategory = await thisObj.addFrontendCategory();

        if (addNewcategory) {
          Log.line("-");
          await thisObj.init();
        } else {
          return await Promise.resolve({ status: true, jsonObj: thisObj.finalConfig });
        }
      }
    } catch (e) {
      Log.message(e, "e");
    }
  };
}

module.exports = FrontendTokenCategories;
