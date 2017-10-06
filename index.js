/**
 * @param  {String} n - number in range 0...999 in string
 * @return {String} number with leading zeros
 */
function zeropadTriad(n) {
    return (new Array(3 - n.length)).fill('0').join('') + n;
}

/**
 * @param  {Number} n
 * @return {Number[]} 0..999
 */
function splitOntoTriads(n) {
    var res = [];
    var i = 0;
    var n = Math.floor(Math.abs(n));
    do {
        res.unshift(n % 1e3);
        if (++i > 50) throw new Error('formatNumber: overcycle on val: ' + n);
    } while (n = Math.floor(n / 1e3));
    return res;
}

function triadTmplDefault (n) {
    return '<span class="num__group">' + n + '</span>';
}

function numTmplDefault (n) {
    return '<span class="num">' + n + '</span>';
}

function concatDefault (sign, triads, frac) {
    return sign + triads.join('') + frac;
}

function padTriads (triads) {
    var zeroPrefixedTriads = triads.slice(1).map(function(n) {
        return zeropadTriad(String(n));
    });
    return [ String(triads[0]) ].concat(zeroPrefixedTriads);
}

/**
 * @param {String|Number} ns - number or number in string
 * @param {Function} triadTmpl_ - e.g. triad => `<span>${triad}</span>`
 * @param {Function} numTmpl_ - e.g. num => `<div>${num}</div>`
 * @param {Function} concat (sign, triads, frac) => sign + triads.join('') + frac
 */
function formatNumber (ns, triadTmpl_, numTmpl_, concat_) {
    var n_ = typeof ns === 'string' ? ns : String(ns);
    if (n_.trim() === '') return '';
    var n = +n_;
    var tmpl = triadTmpl_ || triadTmplDefault;
    var numTmpl = numTmpl_ || numTmplDefault;
    var concat = concat_ || concatDefault;
    var triads = splitOntoTriads(n);
    var zeroPrefixedTriads = triads.slice(1).map(function(n) { return zeropadTriad(String(n)); });
    var sign = n < 0 ? '-' : '';
    var hasFrac = /\./.test(n_);
    var frac = hasFrac ? n_.replace(/^.+\./, '.') : '';
    return numTmpl(concat(sign, padTriads(triads).map(tmpl), frac));
}

module.exports = formatNumber;
