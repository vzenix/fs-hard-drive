const exec = require('child_process').exec;
const os = require('os');

exports.lsDevices = lsDevicesDF;

function lsDevicesDF() {

    let promise = new Promise(function (resolve, reject) {
        exec('df -T -BK', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                reject({
                    error: error,
                    stderr: stderr
                });

                return;
            }

            let info = CMDFormatResponseSpaces(stdout);

            let response = new Array();
            for (let j = 0; j < info.length; j++) {

                if (info[j].length === 7) {
                    let ln = CMDComposeLsDeviceLineDf(info[j]);
                    if (typeof ln.file_system === typeof 'string' && ln.file_system.trim().indexOf('ext') >= 0) {
                        response.push(ln);
                    }
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
        caption: ln[6].trim(),
        description: ln[0].trim(),
        file_system: ln[1].trim(),
        size: parseInt(ln[2].trim().substring(0, ln[2].trim().length - 1), 10) * 1000,
        free_space: parseInt(ln[4].trim().substring(0, ln[4].trim().length - 1), 10) * 1000,
        so: {
            file_system: ln[0],
            type: ln[1],
            one_k_blocks: ln[2],
            used: ln[3],
            available: ln[4],
            use: ln[5],
            mounted_on: ln[6]
        }
    };
}

/**
 * Format a traditional response of shell cmd with headers
 * @param {*} stdout 
 */
function CMDFormatResponseSpaces(stdout) {
    let result = stdout.split(os.EOL);
    let ret = new Array();
    for (let i = 1; i < result.length; i++) {
        ret.push(CMDFormatResponseSpacesCalculateInfo(result[i].trim()));
    }

    return ret;
}


/**
 * Helper of CMDFormatResponseSpaces
 * @param {*} ln 
 */
function CMDFormatResponseSpacesCalculateInfo(ln) {
    let chars = ln.split('');
    let current = {
        title: '',
        position_start: 0,
        position_end: 0
    };

    let ret = new Array();
    let add = false;
    for (let i = 0; i < chars.length; i++) {
        if (chars[i] === ' ') {
            add = true;
        }

        if (chars[i] !== ' ' && add) {
            current.position_end = i - 1;
            current.title = current.title;
            add = false;
            ret.push(current);

            current = {
                title: '',
                position_start: i,
                position_end: i
            };
        }

        current.title += chars[i];
    }

    current.position_end = ln.length;
    ret.push(current);

    let final = new Array();
    for (let i = 0; i < ret.length; i++) {
        final.push(ret[i].title);
    }

    return final;
}
