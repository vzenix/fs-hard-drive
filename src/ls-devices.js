const os = require('os');

exports.DriveType = {
    Unknown: 0,
    NoRootDirectory: 1,
    RemovableDisk: 2,
    LocalDisk: 3,
    NetworkDrive: 4,
    CompactDisc: 5,
    RAMDisk: 6
};

const isWindows = os.type().indexOf('Window') >= 0;
const isLinux = os.type().indexOf('Linux') >= 0;
const isMac = os.type().indexOf('Darwin') >= 0;

if (isWindows) {
    const lsDevices = require('./windows/ls-devices').lsDevices;
    exports.lsDevices = lsDevices;
} else if (isLinux || isMac) {
    const lsDevices = require('./linux/ls-devices').lsDevices;
    exports.lsDevices = lsDevices;
} else {
    exports.lsDevices = () => {
        return new Promise((resolve, reject) => {
            reject({
                error: `OS ${os.type()} not supported`,
                stderr: null
            });
        });
    }
}