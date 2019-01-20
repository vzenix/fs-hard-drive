const assert = require('assert');
const tmpdir = require('os').tmpdir();
const scanFolders = require('../../../src/scan-folders').scanFolders;
const scanFoldersInfo = require('../../../src/scan-folders').scanFoldersInfo;

describe('scanFolders', () => {
    it(`Test function for scan files and folders into "${tmpdir}"`, () => {
        let test = scanFolders(tmpdir);
        test
            .promise
            .then(() => {
                assert.equal(typeof scanFoldersInfo[test.key] !== typeof undefined, true, 'Scan finished');
            })
            .catch((err) => {
                console.error(err);
                assert.equal(0, 1, 'Fatal error on method "scanFolders"');
            });

        return test.promise;
    });
});