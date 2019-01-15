const exec = require('child_process').exec;
const CMDFormatResponseSpaces = require('../utils').CMDFormatResponseSpaces;

exports.lsDevices = lsDevicesWindows;

function lsDevicesWindows() {

    let promise = new Promise(function (resolve, reject) {
        exec('wmic logicaldisk', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                reject({
                    error: error,
                    stderr: stderr
                });
                return;
            }

            let info = CMDFormatResponseSpaces(stdout, false);
            let response = new Array();
            for (let j = 0; j < info.length; j++) {
                let ln = CMDComposeLsDeviceLine(info[j]);
                if (typeof ln.caption === typeof 'string' && ln.caption.trim() !== '') {
                    response.push(ln);
                }
            }

            resolve(response);
        });

    });

    return promise;
}

function CMDComposeLsDeviceLine(ln) {
    let properties = Object.getOwnPropertyNames(ln);
    let ret = {
        drive_type: 0,
        caption: '',
        description: '',
        file_system: 'unknown',
        size: 0,
        free_space: 0,
        so: {}
    };

    for (let i = 0; i < properties.length; i++) {
        switch (properties[i].toLowerCase()) {
            case 'drivetype':
                ret.drive_type = parseInt(ln[properties[i]].value, 10);
                break;
            case 'caption':
                ret.caption = ln[properties[i]].value;
                break;
            case 'description':
                ret.description = ln[properties[i]].value;
                break;
            case 'filesystem':
                ret.file_system = ln[properties[i]].value;
                break;
            case 'size':
                ret.size = parseInt(ln[properties[i]].value, 10);
                break;
            case 'freespace':
                ret.free_space = parseInt(ln[properties[i]].value, 10);
                break;
            default:
                ret.so[properties[i]] = ln[properties[i]].value;
                break;
        }
    }

    return ret;
}