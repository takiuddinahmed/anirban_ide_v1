const ArduinoCli = require("arduino-cli").default;
const path = require("path");
const fs = require("fs");
const uuid = require("uuid").v4;
const logToFile = require("../log");

// console.log({ uuid });
// console.log = () => {};

const progress = (value) => {
  console.log(value);
};

const log = (text) => {
  logToFile(text, "upload.log");
};

const cliPath =
  process.platform === "win32"
    ? path.join("win", "arduino-cli.exe")
    : path.join("linux", "arduino-cli");
const cliFullPath = path.join("bin", cliPath);

const cli = ArduinoCli(cliFullPath, {
  directories: {
    user: "arduino_code/sketches",
    data: "arduino_code/data",
  },
});

const testCode = `
  void setup() {
  // initialize digital pin LED_BUILTIN as an output.
  pinMode(LED_BUILTIN, OUTPUT);
}

// the loop function runs over and over again forever
void loop() {
  digitalWrite(LED_BUILTIN, HIGH);   // turn the LED on (HIGH is the voltage level)
  delay(1000);                       // wait for a second
  digitalWrite(LED_BUILTIN, LOW);    // turn the LED off by making the voltage LOW
  delay(1000);                       // wait for a second
}
`;

async function codeUpload(code, board, port, updateMsg) {
  const failedMsg = (msg, error = {}) => {
    updateMsg({
      completed: "upload",
      successfull: false,
      log: error.stderr,
      done: true,
      msg: msg,
    });
    log(msg);
    log(error.stderr ?? error);
  };
  try {
    const sketchName = `kitty-${uuid()}`;
    updateMsg({ msg: "নতুন স্কেচ প্রস্তুত করা হচ্ছে" });
    let sketchPath;
    try {
      sketchPath = await cli.createSketch(sketchName);
    } catch (err) {
      console.log({ err });
      failedMsg("স্কেচ তৈরি ব্যর্থ হয়েছে", err);
      return;
    }
    updateMsg({ msg: "স্কেচ প্রস্তুত সম্পন্ন হয়েছে" });
    updateMsg({ msg: `sketch location: ${sketchPath}` });
    console.log({ sketchPath });

    fs.writeFileSync(sketchPath, code);
    let compileLog;
    updateMsg({ msg: "কোড কম্পাইল করা হচ্ছে" });
    try {
      compileLog = await cli.compile(
        progress,
        "arduino:avr:nano:cpu=atmega328old",
        sketchPath
      );
      console.log({ compileLog });
    } catch (err) {
      console.log({ err });
      failedMsg("কোড কম্পাইল ব্যর্থ হয়েছে", err);
      return;
    }
    updateMsg({
      completed: "compile",
      msg: "কোড কম্পাইল সম্পন্ন হয়েছে",
      log: compileLog,
    });
    try {
      const uploadLog = await cli.upload(
        progress,
        port,
        "arduino:avr:nano:cpu=atmega328old",
        sketchPath
      );
      updateMsg({
        completed: "upload",
        successfull: true,
        log: uploadLog,
        msg: "কোড আপলোড সম্পন্ন হয়েছে",
        done: true,
      });
    } catch (error) {
      failedMsg("কোড আপলোড সম্পন্ন হয়নি", error);
      console.log({ error, text: error.stderr });
      return;
    }
  } catch (error) {
    failedMsg("প্রসেস সম্পন্ন হয়নি", error);
    console.log({ error, text: error.stderr });
  }
}

function cancelArduinoProcess() {
  let processCancelStatus = cli.killProcesses();
  console.log({ processCancelStatus });
}

exports.module = {
  codeUpload,
  cancelArduinoProcess,
};
