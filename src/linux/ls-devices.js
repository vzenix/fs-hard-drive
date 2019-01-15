const exec = require('child_process').exec;
const CMDFormatResponseSpaces = require('../utils').CMDFormatResponseSpaces;

exports.lsDevices = lsDevicesDF;

function lsDevicesDF() {

    let promise = new Promise(function (resolve, reject) {
        exec('df -T -K -BH', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                reject({
                    error: error,
                    stderr: stderr
                });
                return;
            }

            let info = CMDFormatResponseSpaces(stdout, true);
            let response = new Array();
            for (let j = 0; j < info.length; j++) {
                let ln = CMDComposeLsDeviceLineDf(Object.values(info[j]));
                if (typeof ln.file_system === typeof 'string' && ln.file_system.trim().indexOf('ext') >= 0) {
                    ln.so = info[j];
                    response.push(ln);
                }
            }

            resolve(response);
        });

    });

    return promise;
}

function CMDComposeLsDeviceLineDf(ln) {
    return {
        drive_type: 0,
        caption: ln[6],
        description: ln[0],
        file_system: ln[1],
        size: ln[1],
        free_space: ln[1],
        so: ln
    };
}