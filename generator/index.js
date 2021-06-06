/**
 * FileCopyrightText: JayGajjar <jaygajjar29@gmail.com>.
 * LicenseIdentifier: MIT
 */

const Chalk = require("chalk");
const Figlet = require("figlet");
const Modal = require("./modules/Modal");
const stylebookConfig = require("./modules/StylebookConfig");

function Main() {
  console.log(Chalk.blue(Figlet.textSync(Modal._organizationName, { font: "marquee", horizontalLayout: "full" })));
  console.log(Chalk.blue(`${Modal._welcomeMessage}\n`));

  stylebookConfig.init();
}

exports.main = Main;
