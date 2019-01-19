const assert = require('assert');
const Utils = require('../../../src/index').Utils;

describe('Utils', () => {
    it('Test pretty size converter', () => {
        assert.equal(Utils.prettySize(512), '512 Bytes', 'ISO 512 Bytes (without magnitude)');

        assert.equal(Utils.prettySize(1024), '1KiB', 'ISO 1KiB (without magnitude)');
        assert.equal(Utils.prettySize(1024, 0), '1KiB', 'ISO 1KiB (with magnitude)');
        assert.equal(Utils.prettySize(1000, 1), '1kB', 'Decimal 1KB');

        assert.equal(Utils.prettySize(1024 * 1024), '1MiB', 'ISO 1MiB (without magnitude)');
        assert.equal(Utils.prettySize(1024 * 1024, 0), '1MiB', 'ISO 1MiB (with magnitude)');
        assert.equal(Utils.prettySize(1000 * 1000, 1), '1MB', 'Decimal 1MB');
    });
});