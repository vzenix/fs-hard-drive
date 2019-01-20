//
/*
---------------------------------------------------
                decimal                 binary
---------------------------------------------------
kilobyte (kB) 	10^3 	kibibyte (KiB) 	2^10
megabyte (MB) 	10^6 	mebibyte (MiB) 	2^20
gigabyte (GB) 	10^9 	gibibyte (GiB) 	2^30
terabyte (TB) 	101^2 	tebibyte (TiB) 	2^40
petabyte (PB) 	101^5 	pebibyte (PiB) 	2^50
exabyte (EB) 	101^8 	exbibyte (EiB) 	2^60
zettabyte (ZB) 	102^1 	zebibyte (ZiB) 	2^70
yottabyte (YB) 	102^4 	yobibyte (YiB) 	2^80
---------------------------------------------------
 */

const Magnitudes = {
    BINARY: 0,
    DECIMAL: 1
};

const tableMagnitudes = [{
        decimal: 1000,
        decimal_pretty: 'kB',
        iso: 1024,
        iso_pretty: 'KiB'
    },
    {
        decimal: 1000,
        decimal_pretty: 'MB',
        iso: 1024,
        iso_pretty: 'MiB'
    },
    {
        decimal: 1000,
        decimal_pretty: 'GB',
        iso: 1024,
        iso_pretty: 'GiB'
    },
    {
        decimal: 1000,
        decimal_pretty: 'TB',
        iso: 1024,
        iso_pretty: 'TiB'
    },
    {
        decimal: 1000,
        decimal_pretty: 'PB',
        iso: 1024,
        iso_pretty: 'PiB'
    },
    {
        decimal: 1000,
        decimal_pretty: 'EB',
        iso: 1024,
        iso_pretty: 'EiB'
    },
    {
        decimal: 1000,
        decimal_pretty: 'ZB',
        iso: 1024,
        iso_pretty: 'ZiB'
    },
    {
        decimal: 1000,
        decimal_pretty: 'YB',
        iso: 1024,
        iso_pretty: 'YiB'
    }
];


/**
 * Convert from bytes to humman readable hard disk size
 * @param {int} size 
 * @param {int} magnityde 0 => ISO/IEC 80000-13 (binary); 1 => International System of Units (decimal), ise Magnitudes enum
 * @returns {string}
 */
function prettySize(size, magnitude = 0) {
    if (typeof size !== typeof 4) {
        return `Unknow size ${size}, it's must be an integer and bytes`;
    }

    let mult = magnitude === Magnitudes.BINARY ? 1024 : 1000;
    if (mult > size) {
        return `${size} Bytes`;
    }

    let index = 0;
    let current = size;
    let pretty = '';
    do {
        mult = magnitude === Magnitudes.BINARY ? tableMagnitudes[index].iso : tableMagnitudes[index].decimal;
        pretty = magnitude === Magnitudes.BINARY ? tableMagnitudes[index].iso_pretty : tableMagnitudes[index].decimal_pretty;
        if ((current / mult) < mult) {
            return `${Math.round(current / mult)}${pretty}`;
        }

        current = current / mult;
        index++;
    } while (index < tableMagnitudes.length);

    return `${Math.round(current / mult)}${pretty}`;
}

exports.Utils = {
    Magnitudes: Magnitudes,
    prettySize: prettySize
};