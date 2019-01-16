const os = require('os');
const {
    DriveType,
    lsDevices
} = require('./ls-devices');
// const scanFolder = require('./scan-folder').scanFolder;

// List devices
exports.DriveType = DriveType;
exports.lsDevices = lsDevices;

// Scan folders
// exports.scanFolder = scanFolder;

// scanFolder("E:\\ad\\wamp");

lsDevices()
    .then((r) => console.log('response: ', JSON.stringify(r)))
    .catch((err) => console.log('err: ', err));
