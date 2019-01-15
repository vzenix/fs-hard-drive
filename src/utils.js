//
const os = require('os');

exports.CMDFormatResponseSpaces = CMDFormatResponseSpaces;

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