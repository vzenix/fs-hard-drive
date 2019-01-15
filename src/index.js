const os = require('os');
const {
    DriveType,
    lsDevices
} = require('./ls-devices');

exports.DriveType = DriveType;
exports.lsDevices = lsDevices;

/*
lsDevices()
    .then((r) => console.log('response: ', JSON.stringify(r)))
    .catch((err) => console.log('err: ', err));
    */