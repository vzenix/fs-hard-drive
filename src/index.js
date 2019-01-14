const {
    exec
} = require('child_process');
const os = require('os');
const {
    CMDformatResponseSpaces
} = require('./utils');

exports.DriveType = {
    Unknown: 0,
    NoRootDirectory: 1,
    RemovableDisk: 2,
    LocalDisk: 3,
    NetworkDrive: 4,
    CompactDisc: 5,
    RAMDisk: 6
};

exports.lsDevices = lsDevices;

const isWindows = os.type().indexOf('Window') >= 0;
const isLinux = os.type().indexOf('Linux') >= 0;
const isMac = os.type().indexOf('Darwin') >= 0;

function lsDevices(fn) {
    if (isWindows) {
        return lsDevicesWindows(fn);
    }

    if (isLinux || isMac) {
        return lsDevicesDF(fn);
    }

    throw `OS ${os.type()} not supported`;
}

function lsDevicesWindows(fn) {
    exec('wmic logicaldisk', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }

        let info = CMDformatResponseSpaces(stdout);
        fn(info);
    });
}

// lsDevices((r) => console.log('Response: ', r));
//