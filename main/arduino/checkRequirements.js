// import arduinoCli from 'arduino-cli';
// import path from 'path';
const arduinoCli = require('arduino-cli').default;
const path = require('path');

console.log = function () {};

const checkRequirements = async () => {
  const cliPath =
    process.platform === 'win32'
      ? path.join('win', 'arduino-cli.exe')
      : path.join('linux', 'arduino-cli');
  const cliFullPath = path.join(__dirname, 'bin', cliPath);

  const cli = arduinoCli(cliFullPath, {
    directories: {
      user: '~/arduino_code/sketches',
      data: '~/arduino_code/data',
    },
  });
  // await
  const coreList = await cli.core.list();
  console.log(coreList);
  if (!coreList.length) {
    const log = cli.core.install((p) => {
      console.log({ progress: p });
    }, 'arduino:avr');
    console.log({ log });
  }
};

// export default checkRequirements;
exports.module =   checkRequirements;

