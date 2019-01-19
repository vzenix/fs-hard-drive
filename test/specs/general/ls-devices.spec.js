const assert = require('assert');
const {
    lsDevices
} = require('../../../src/index');

describe('lsDevice', () => {
    it('Test function for list hard disk devices:', () => {
        return lsDevices()
            .then(function (value) {
                assert.equal(Array.isArray(value), true, 'Invalid format returned, It Didn\'t returned an array');
                assert.notEqual(value.length, 0, 'No hard disk devices detected');
            })
            .catch((err) => {
                console.err(err);
                assert.equal(0, 1, 'Fatal error on method "lsDevices"');
            });
    });
});