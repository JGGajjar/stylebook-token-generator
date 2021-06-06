/* eslint-disable no-new-object */
/* eslint-disable arrow-body-style */
/* eslint-disable spaced-comment */
/**
 * FileCopyrightText: JayGajjar <jaygajjar29@gmail.com>.
 * LicenseIdentifier: MIT
 */

const inquirer = require("inquirer");
const ModalObj = require("./Modal");
const Log = require("./Log");

class FrontendTokens {
  constructor(configJson) {
    this.finalConfig = configJson;

    this.setFinalJson = (mainObj, tempObj, curObj) => FrontendTokens._setFinalJson(mainObj, tempObj, curObj);

    this.getConfirmation = async () => await FrontendTokens._getConfirmation();

    this.getAnswers = (editorQuestionObj, tokenQuestion, jsonObj) => FrontendTokens._getAnswers(editorQuestionObj, tokenQuestion, jsonObj);
  }

  static _getEditorType = async (questionObj, tokenQuestion, jsonObj) => {
    const editorOptionQuestion = ModalObj._editorTypeOptionQuestion;

    const getEditorTyep = await inquirer.prompt(questionObj).then((answers) => answers);

    if (getEditorTyep.editorType.toLowerCase() === "Checkbox".toLowerCase()) {
      tokenQuestion.filter((Obj) => {
        Obj.name === "type" && (Obj.choices = ["Boolean"]);
        Obj.name === "defaultValue" &&
          (function () {
            Obj.type = "list";
            Obj.choices = ["true", "false"];
          })();
      });
    } else {
      tokenQuestion.filter((Obj) => {
        Obj.name === "type" && (Obj.choices = ["Integer", "Number", "String"]);
        Obj.name === "defaultValue" &&
          (function () {
            Obj.type = "text";
            Obj.choices && delete Obj.choices;
          })();
      });
    }

    await ((getEditorTyep.editorType === "Select" && FrontendTokens._getEditorTypeSelectOption(editorOptionQuestion, jsonObj.validValues)) ||
      (jsonObj.editorType = getEditorTyep.editorType));
  };

  static _getEditorTypeSelectOption = async (questionObj, Obj) => {
    Log.line("~");
    const getAns = await inquirer.prompt(questionObj).then((answers) => answers);

    Obj.push(Object.fromEntries(Object.entries(getAns).filter((key) => key[0] != "editorTypeSelectConfirm")));

    getAns.editorTypeSelectConfirm && (await FrontendTokens._getEditorTypeSelectOption(questionObj, Obj));
  };

  static _getAnswers = async (editorQuestionObj, tokenQuestion, jsonObj) =>
    await FrontendTokens._getEditorType(editorQuestionObj, tokenQuestion, jsonObj).then(async () => {
      Log.line("~");
      return await inquirer.prompt(tokenQuestion).then((answers) => answers);
    });

  static _setFinalJson = (mainObj, tempObj, curObj) => {
    tempObj.mappings[0].value = curObj.cssVariable;

    if (tempObj.validValues.length > 0) {
      tempObj.editorType = "NC";
    } else if (tempObj.validValues.length === 0) {
      tempObj.validValues = "NC";
    }

    mainObj.frontendTokenCategories[mainObj.frontendTokenCategories.length - 1].frontendTokenSets[
      mainObj.frontendTokenCategories[mainObj.frontendTokenCategories.length - 1].frontendTokenSets.length - 1
    ].frontendTokens.push({
      ...Object.fromEntries(Object.entries(tempObj).filter((key) => key[1] != "NC")),
      ...Object.fromEntries(Object.entries(curObj).filter((key) => key[0] != "cssVariable")),
    });

    tempObj.editorType = "";
    tempObj.validValues = [];
  };

  static _getConfirmation = async () => {
    return await inquirer
      .prompt([
        {
          type: "confirm",
          name: "addnewtokens",
          message: `Would you like to add new "frontendTokens"?`,
        },
      ])
      .then((answers) => answers.addnewtokens);
  };

  init = async () => {
    try {
      const thisObj = this;

      const modalObj = ModalObj._frontendTokens;

      const editorTypeQuestion = ModalObj._editorTypeQuestion;

      const tokenQuestion = ModalObj._frontendTokensQuestions;

      const getAnswers = await thisObj.getAnswers(editorTypeQuestion, tokenQuestion, modalObj);

      thisObj.setFinalJson(thisObj.finalConfig, modalObj, getAnswers);

      Log.print(JSON.stringify(thisObj.finalConfig, null, 2));

      const isAddFrontendTokens = await thisObj.getConfirmation();

      if (isAddFrontendTokens) {
        await thisObj.init();
      } else {
        return await Promise.resolve({ status: true, jsonObj: thisObj.finalConfig });
      }
    } catch (e) {
      Log.message(e, "e");
    }
  };
}

module.exports = FrontendTokens;
