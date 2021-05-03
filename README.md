# stylebook-token-generator

A CLI to help generate the stylebook token for Liferay DXP 7.3.

## Generator use

1. Install generator: `npm install stylebook-token-generator`.
2. Run `npm run stylebook` to start stylebook generator and follow prompts and configure stylebook tokens for your theme.

Note: Define [theme name]-theme module directory path and the genereator will create a frontend-token-definition.json inside [theme name]-theme\src\WEB-INF\ directory.

## Defination of Tokens

1. Token Categories `frontendTokenCategories`

Token categories will crate grouped of categorie's options in the drop-down menu for your stylebook.

| Token | Defination                                                                |
| ----- | ------------------------------------------------------------------------- |
| label | label's value displayed as a options inside the stylebook drop-down menu. |
| name  | Filed required unique name for each Token categories.                     |

```
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
{
    "frontendTokenCategories": [
        {
            "frontendTokenSets": [
                {
                    "frontendTokens": [],
                    "label": "primary-buttons",
                    "name": "primaryButtons"
                }
            ],
            "label": "buttons",
            "name": "buttons"
        }
    ]
}
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
]
```
