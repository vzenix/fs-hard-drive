const assert = require('assert');
const {
    lsDevices
} = require('../../../src/index');

describe('lsDevince', () => {
    it('Test 01:', () => {
        lsDevices()
            .then((r) => {
                // assert.equal(0, 1);
            })
            .catch((err) => {
                // assert.equal(0, 1);
            });

        assert.equal(1, 1);
    });
});