/**
 * FileCopyrightText: JayGajjar <jaygajjar29@gmail.com>.
 * LicenseIdentifier: MIT
 */

const organizationName = "AG1806";

const welcomeMessage = "Welcome to stylebook generator for Liferay DXP and Portal CE 7.3+";

const frontendTokenDefinitionJson = {
  frontendTokenCategories: [],
};

const FrontendTokenCategories = {
  frontendTokenSets: [],
  label: "",
  name: "",
};

const FrontendTokenSets = {
  frontendTokens: [],
  name: "",
  label: "",
};

const FrontendTokens = {
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

const FrontendTokenCategoriesQuestions = [
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

const FrontendTokenSetsQuestions = [
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

const FrontendTokensQuestions = [
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

const EditorTypeQuestion = {
  type: "list",
  name: "editorType",
  message: "Choose \x1b[33meditorType\x1b[0m.",
  choices: ["ColorPicker", "Text", "Checkbox", "Select"],
};

const EditorTypeOptionQuestion = [
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

class ModalTokens {
  static get _organizationName() {
    return organizationName;
  }

  static get _welcomeMessage() {
    return welcomeMessage;
  }

  static get _frontendTokenDefinitionJson() {
    return frontendTokenDefinitionJson;
  }

  static get _frontendTokenCategories() {
    return FrontendTokenCategories;
  }

  static get _frontendTokenSets() {
    return FrontendTokenSets;
  }

  static get _frontendTokens() {
    return FrontendTokens;
  }

  static get _frontendTokenCategoriesQuestions() {
    return FrontendTokenCategoriesQuestions;
  }

  static get _frontendTokenSetsQuestions() {
    return FrontendTokenSetsQuestions;
  }

  static get _frontendTokensQuestions() {
    return FrontendTokensQuestions;
  }

  static get _editorTypeQuestion() {
    return EditorTypeQuestion;
  }

  static get _editorTypeOptionQuestion() {
    return EditorTypeOptionQuestion;
  }
}

module.exports = ModalTokens;
