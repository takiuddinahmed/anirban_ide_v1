const SerialPort = require('serialport');

const getPortList = async () => {
  try {
    const portList = await SerialPort.list();
    //  return portList.filter(port => port.productId);
    return portList;
  } catch (err) {
    return Promise.reject(err);
  }
};

exports.module =  getPortList
