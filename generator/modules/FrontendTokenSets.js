/**
 * FileCopyrightText: JayGajjar <jaygajjar29@gmail.com>.
 * LicenseIdentifier: MIT
 */

const inquirer = require("inquirer");
const ModalObj = require("./Modal");
const FrontendTokens = require("./FrontendTokens");
const Log = require("./Log");

class FrontendTokenSets {
  constructor(configJson) {
    this.finalConfig = configJson;

    this.setObject = (curObj, ModalObj, ansObj) => FrontendTokenSets.setObject(curObj, ModalObj, ansObj);

    this.addFrontendTokens = (categoryLabel) => FrontendTokenSets.addFrontendTokens(categoryLabel);

    this.addFrontendTokenSets = () => FrontendTokenSets.addFrontendTokenSets();
  }

  static setObject = (curObj, ModalObj, ansObj) =>
    curObj.frontendTokenCategories[curObj.frontendTokenCategories.length - 1].frontendTokenSets.push({
      ...ModalObj,
      ...ansObj,
    });

  static addFrontendTokens = async (categoryLabel) =>
    await inquirer
      .prompt([
        {
          type: "confirm",
          name: "addfrontendtokens",
          message: `Would you like to add new "frontendTokens" for \x1b[34m"${categoryLabel}"\x1b[0m "frontendTokenSets"?`,
        },
      ])
      .then((answers) => answers.addfrontendtokens);

  static addFrontendTokenSets = async () =>
    await inquirer
      .prompt([
        {
          type: "confirm",
          name: "addfrontendTokenSets",
          message: `Would you like to add new "frontendTokenSets"?`,
        },
      ])
      .then((answers) => answers.addfrontendTokenSets);

  init = async () => {
    try {
      const thisObj = this;

      const modalObj = ModalObj._frontendTokenSets;

      const questions = ModalObj._frontendTokenSetsQuestions;

      const getAns = await inquirer.prompt(questions).then((answers) => answers);

      thisObj.setObject(thisObj.finalConfig, modalObj, getAns);

      Log.print(JSON.stringify(thisObj.finalConfig, null, 2));

      const isaddFrontendTokens = await thisObj.addFrontendTokens(getAns.label);

      if (isaddFrontendTokens) {
        Log.line(">");

        const frontendTokens = new FrontendTokens(thisObj.finalConfig);

        const isDone = await frontendTokens.init();

        if (isDone && isDone.status) {
          Log.line("<");

          const isaddFrontendTokenSets = await thisObj.addFrontendTokenSets();

          if (isaddFrontendTokenSets) {
            await thisObj.init();
          } else {
            return await Promise.resolve({ status: true, jsonObj: thisObj.finalConfig });
          }
        }
      } else {
        return await Promise.resolve({ status: true, jsonObj: thisObj.finalConfig });
      }
    } catch (e) {
      Log.message(e, "e");
    }
  };
}

module.exports = FrontendTokenSets;
