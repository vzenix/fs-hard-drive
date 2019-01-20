const exec = require('child_process').exec;
const os = require('os');

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


/**
 * Format a traditional response of shell cmd with headers
 * @param {*} stdout 
 */
function CMDFormatResponseSpaces(stdout) {
    let result = stdout.split(os.EOL);
    let infos = CMDFormatResponseSpacesCalculateInfo(result[0].trim());
    let ret = new Array();

    for (let i = 1; i < result.length; i++) {
        let lnRaw = result[i].trim();

        let lnInfo = {};
        for (let j = 0; j < infos.length; j++) {
            lnInfo[infos[j].title] = {
                title: infos[j].title,
                value: lnRaw.substr(infos[j].position_start, infos[j].position_end - infos[j].position_start).trim()
            };
        }

        ret.push(lnInfo);
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
            current.title = current.title.trim();
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

    ret.push(current);
    return ret;
}