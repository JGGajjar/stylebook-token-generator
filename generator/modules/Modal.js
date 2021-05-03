/**
 * FileCopyrightText: Jay <jpm4vr@gmail.com>.
 * LicenseIdentifier: MIT
 */

class ModalTokens {
  #frontendTokenDefinitionJson = {
    frontendTokenCategories: [],
  };

  #FrontendTokenCategories = {
    frontendTokenSets: [],
    label: "",
    name: "",
  };

  #FrontendTokenSets = {
    frontendTokens: [],
    name: "",
    label: "",
  };

  #FrontendTokens = {
    defaultValue: "",
    editorType: "",
    label: "",
    mappings: [
      {
        type: "cssVariable",
        value: "",
      },
    ],
    name: "",
    type: "",
    validValues: [],
  };

  #FrontendTokenCategoriesQuestions = [
    {
      type: "text",
      name: "label",
      message: `Define \x1b[33mLabel\x1b[0m for "frontendTokenCategories".`,
    },
    {
      type: "text",
      name: "name",
      message: `Define \x1b[33mName\x1b[0m for "frontendTokenCategories".`,
      validate: (answer) => (+answer === 0 ? "Is required." : true),
    },
  ];

  #FrontendTokenSetsQuestions = [
    {
      type: "text",
      name: "label",
      message: `Define \x1b[33mLabel\x1b[0m for "frontendTokenSets".`,
    },
    {
      type: "text",
      name: "name",
      message: `Define \x1b[33mName\x1b[0m for "frontendTokenSets".`,
      validate: (answer) => (+answer === 0 ? "Is required." : true),
    },
  ];

  #FrontendTokensQuestions = [
    {
      type: "text",
      name: "defaultValue",
      message: "Define \x1b[33mdefaultValue\x1b[0m.",
    },
    {
      type: "text",
      name: "label",
      message: "Define \x1b[33mlabel\x1b[0m.",
    },
    {
      type: "text",
      name: "name",
      message: "Define \x1b[33mname\x1b[0m.",
      validate: (answer) => (+answer === 0 ? "Is required." : true),
    },
    {
      type: "list",
      name: "type",
      message: "Choose \x1b[33mfield type\x1b[0m.",
      choices: ["Boolean", "Integer", "Number", "String"],
    },
    {
      type: "text",
      name: "cssVariable",
      message: "Define mappings \x1b[33mcssVariable name\x1b[0m.",
      validate: (answer) => (+answer === 0 ? "Is required." : true),
    },
  ];

  #EditorTypeQuestion = {
    type: "list",
    name: "editorType",
    message: "Choose \x1b[33meditorType\x1b[0m.",
    choices: ["ColorPicker", "Text", "Checkbox", "Select"],
  };

  #EditorTypeOptionQuestion = [
    {
      type: "text",
      name: "label",
      message: `Define \x1b[33mLabel\x1b[0m of Option.`,
    },
    {
      type: "text",
      name: "value",
      message: `Define \x1b[33mValue\x1b[0m for Option.`,
      validate: (answer) => (+answer === 0 ? "Is required." : true),
    },
    {
      type: "confirm",
      name: "editorTypeSelectConfirm",
      message: `Add More Option.`,
      default: false,
    },
  ];

  get _frontendTokenDefinitionJson() {
    return this.#frontendTokenDefinitionJson;
  }

  get _frontendTokenCategories() {
    return this.#FrontendTokenCategories;
  }

  get _frontendTokenSets() {
    return this.#FrontendTokenSets;
  }

  get _frontendTokens() {
    return this.#FrontendTokens;
  }

  get _frontendTokenCategoriesQuestions() {
    return this.#FrontendTokenCategoriesQuestions;
  }

  get _frontendTokenSetsQuestions() {
    return this.#FrontendTokenSetsQuestions;
  }

  get _frontendTokensQuestions() {
    return this.#FrontendTokensQuestions;
  }

  get _editorTypeQuestion() {
    return this.#EditorTypeQuestion;
  }

  get _editorTypeOptionQuestion() {
    return this.#EditorTypeOptionQuestion;
  }
}

module.exports = ModalTokens;
