//
const fs = require('fs');
const path = require('path');
const crypto = require("crypto");

let scanFoldersInfo = {};

exports.scanFoldersInfo = scanFoldersInfo;
exports.scanFolders = initScan;

function initScan(rootDir) {
    let key = crypto.randomBytes(8).toString("hex");;
    scanFoldersInfo[key] = {
        types: {},
        global: {
            files: 0,
            size: 0,
            start: new Date(),
            end: null
        },
        tree: {}
    };

    let promise = new Promise(function (resolve, reject) {
        process.nextTick(() => {
            try {
                scanFoldersInfo[key].tree = scanFolders(rootDir, key);
                scanFoldersInfo[key].global.end = new Date();
                scanFoldersInfo[key].global.size = scanFoldersInfo[key].tree.info.size;
                scanFoldersInfo[key].global.files = scanFoldersInfo[key].tree.info.files;
                resolve();
            } catch (ex) {
                reject({
                    error: ex
                });
            }
        });
    });

    return {
        promise: promise,
        key: key
    };
}

function scanFolders(rootDir, key) {
    let ret = {
        info: {
            files: 0,
            size: 0
        },
        folders: [],
        files: [],
        others: [],
        not_readable: []
    };

    let files = null;
    try {
        files = fs.readdirSync(rootDir);
    } catch (ex) {
        ret.error = ex;
        return ret;
    }

    for (var i = 0; i < files.length; i++) {
        let route = path.join(rootDir, files[i]);

        try {
            let info = fs.statSync(route);

            if (info.isDirectory()) {
                ret.folders.push({
                    name: files[i],
                    path: route,
                    // info: info,
                    size: 0,
                    children: {}
                });
            } else if (info.isFile()) {
                ret.files.push({
                    name: files[i],
                    path: route,
                    // info: info,
                    size: info.size
                });

                ret.info.size += info.size;
            } else {
                ret.others.push({
                    name: files[i],
                    path: route,
                    // info: info,
                    size: info.size
                });
            }
        } catch (ex) {
            ret.others.push({
                name: files[i],
                path: route,
                // info: null,
                size: 0,
                error: ex
            });
        }
    }

    ret.info.files = ret.files.length;
    for (let j = 0; j < ret.folders.length; j++) {
        ret.folders[j].children = scanFolders(ret.folders[j].path, key);

        ret.info.files += ret.folders[j].children.info.files;
        ret.info.size += ret.folders[j].children.info.size;
    }

    for (var j = 0; j < ret.files.length; j++) {
        let pos = ret.files[j].name.lastIndexOf('.');
        if (pos > 0) {
            let extension = ret.files[j].name.substring(pos);
            scanFoldersInfo[key].types[extension] = typeof scanFoldersInfo[key].types[extension] === typeof 5 ?
                scanFoldersInfo[key].types[extension] + 1 : 1;
        }
    }

    scanFoldersInfo[key].global.files += ret.info.files;
    scanFoldersInfo[key].global.size += ret.info.size;
    return ret;
}