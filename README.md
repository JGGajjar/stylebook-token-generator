# stylebook-token-generator

A CLI to help generate the stylebook token for Liferay DXP 7.3.

## Generator use

1. Install generator: `npm i stylebook-token-generator -g`.
2. Run `stylebook` to start stylebook generator and follow prompts and configure stylebook tokens for your theme.

Note: Define [theme name]-theme module directory path and the genereator will create a frontend-token-definition.json inside [theme name]-theme\src\WEB-INF\ directory.

## Defination of Tokens

1. Token Categories `frontendTokenCategories`

Token categories will crate grouped of categorie's options in the drop-down menu for your stylebook.

| Token | Defination                                                                |
| ----- | ------------------------------------------------------------------------- |
| label | label's value displayed as a options inside the stylebook drop-down menu. |
| name  | Filed required unique name for each Token categories.                     |

```
? Define Label for "frontendTokenCategories". buttons
? Define Name for "frontendTokenCategories". buttons

----------------------------------------------------------------------------------------

> frontend-token-definition jSON Status:

----------------------------------------------------------------------------------------

{
  "frontendTokenCategories": [
    {
      "frontendTokenSets": [],
      "label": "buttons",
      "name": "buttons"
    }
  ]
}

```

2. Token Sets `frontendTokenSets`

Token Sets will create collapsible options menu for each Token Categories.

| Token | Defination                                                             |
| ----- | ---------------------------------------------------------------------- |
| label | label's value displayed as a collapsible options inside the stylebook. |
| name  | Required unique name for each Token Sets.                              |

```
? Would you like to add new frontendTokenSets for "buttons" frontendTokenCategories? Yes

>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

? Define Label for "frontendTokenSets". primary-buttons
? Define Name for "frontendTokenSets". primary-buttons

----------------------------------------------------------------------------------------

> frontend-token-definition jSON Status:

----------------------------------------------------------------------------------------

{
  "frontendTokenCategories": [
    {
      "frontendTokenSets": [
        {
          "frontendTokens": [],
          "name": "primary-buttons",
          "label": "primary-buttons"
        }
      ],
      "label": "buttons",
      "name": "buttons"
    }
  ]
}

----------------------------------------------------------------------------------------
```

3. Tokens `frontendTokens`

Token of each Token Sets will provided set of configurable properties for stylebook.

| Token        | Defination                                                                                                                             |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| editorType   | Define the filed type. Options: `ColorPicker`, `Checkbox`, `Text` or `Select`                                                          |
| type         | Define the data type of filed. Options: `Integer`, `Float`, `String` or `Boolean`                                                      |
| defaultValue | Define the default value based on the data type.                                                                                       |
| mappings     | To create mapping between CSS variable name and token. define `type` is equal to "cssVariable" and `value` as a mapping variable name. |
| label        | Create the label of the field.                                                                                                         |
| name         | Required unique name for each Token.                                                                                                   |
| validValues  | It will create options for drop-down menu of Selectable `editorType`.                                                                  |

```
? Would you like to add new "frontendTokens" for "primary-buttons" "frontendTokenSets"? Yes

>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

? Choose editorType. ColorPicker

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

? Define defaultValue. #5B443E
? Define label. Primary
? Define name. primaryColor
? Choose field type. String
? Define mappings cssVariable name. --bg-primary

----------------------------------------------------------------------------------------

> frontend-token-definition jSON Status:

----------------------------------------------------------------------------------------

{
  "frontendTokenCategories": [
    {
      "frontendTokenSets": [
        {
          "frontendTokens": [
            {
              "defaultValue": "#5B443E",
              "editorType": "ColorPicker",
              "label": "Primary",
              "mappings": [
                {
                  "type": "cssVariable",
                  "value": "--bg-primary"
                }
              ],
              "name": "primaryColor",
              "type": "String"
            }
          ],
          "name": "primary-buttons",
          "label": "primary-buttons"
        }
      ],
      "label": "buttons",
      "name": "buttons"
    }
  ]
}

----------------------------------------------------------------------------------------

? Would you like to add new "frontendTokens"? Yes
? Choose editorType. Select

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

? Define Label of Option. 16px
? Define Value for Option. --fs-1
? Add More Option. Yes

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

? Define Label of Option. 32px
? Define Value for Option. --fs-2
? Add More Option. No

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

? Define defaultValue. --fs-1
? Define label. Font Size
? Define name. fontSize
? Choose field type. String
? Define mappings cssVariable name. --pb-fs

----------------------------------------------------------------------------------------

> frontend-token-definition jSON Status:

----------------------------------------------------------------------------------------

{
  "frontendTokenCategories": [
    {
      "frontendTokenSets": [
        {
          "frontendTokens": [
            {
              "defaultValue": "#5B443E",
              "editorType": "ColorPicker",
              "label": "Primary",
              "mappings": [
                {
                  "type": "cssVariable",
                  "value": "--bg-primary"
                }
              ],
              "name": "primaryColor",
              "type": "String"
            },
            {
              "defaultValue": "--fs-1",
              "label": "Font Size",
              "mappings": [
                {
                  "type": "cssVariable",
                  "value": "--pb-fs"
                }
              ],
              "name": "fontSize",
              "type": "String",
              "validValues": [
                {
                  "label": "16px",
                  "value": "--fs-1"
                },
                {
                  "label": "32px",
                  "value": "--fs-2"
                }
              ]
            }
          ],
          "name": "primary-buttons",
          "label": "primary-buttons"
        }
      ],
      "label": "buttons",
      "name": "buttons"
    }
  ]
}

----------------------------------------------------------------------------------------
```
