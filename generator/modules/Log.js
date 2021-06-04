/**
 * FileCopyrightText: JayGajjar <jaygajjar29@gmail.com>.
 * LicenseIdentifier: MIT
 */

class Log {
  print = (dataObj) => {
    (function (charObj) {
      let strObj = "\n";
      for (let i = 0; i < 150; i++) {
        strObj += charObj;
      }
      console.log(strObj + "\n");
    })("-");
    console.log("> frontend-token-definition jSON Status:");
    (function (charObj) {
      let strObj = "\n";
      for (let i = 0; i < 150; i++) {
        strObj += charObj;
      }
      console.log(strObj + "\n");
    })("-");
    console.log("\x1b[33m%s\x1b[0m", dataObj);
    (function (charObj) {
      let strObj = "\n";
      for (let i = 0; i < 150; i++) {
        strObj += charObj;
      }
      console.log(strObj + "\n");
    })("-");
  };

  message = (m, c) => {
    let color = c && c === "e" ? "\x1b[31m%s\x1b[0m" : "\x1b[34m%s\x1b[0m";
    (function (charObj, c) {
      let strObj = "\n";
      for (let i = 0; i < 150; i++) {
        strObj += charObj;
      }
      console.log(c, strObj + "\n");
    })(c != "e" ? "=" : "", color);
    console.log(color, m);
    (function (charObj, c) {
      let strObj = "\n";
      for (let i = 0; i < 150; i++) {
        strObj += charObj;
      }
      console.log(c, strObj + "\n");
    })(c != "e" ? "=" : "", color);
  };

  line = (charObj) => {
    (function (charObj) {
      let strObj = "\n";
      for (let i = 0; i < 150; i++) {
        strObj += charObj;
      }
      console.log(strObj + "\n");
    })(charObj);
  };
}

module.exports = new Log();
