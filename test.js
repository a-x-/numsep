var formatNumber = require('.');
var res = true;

(function () {
    var triadTmpl = function(n) { return '<span>' + n + '</span>' };
    var numberTmpl = triadTmpl;
    var te = new Te(function (num) {
        return formatNumber(num, triadTmpl, numberTmpl);
    });

    te.st(1, '<span><span>1</span></span>');
    te.st(100, '<span><span>100</span></span>');
    te.st(10001, '<span><span>10</span><span>001</span></span>');
    te.st(-10001, '<span>-<span>10</span><span>001</span></span>');
    te.st(-10001.0, '<span>-<span>10</span><span>001</span></span>'); // .0 is skiped
    te.st(-10001.505, '<span>-<span>10</span><span>001</span>.505</span>');
    te.st(-0.505, '<span>-<span>0</span>.505</span>');
    te.st(0.505, '<span><span>0</span>.505</span>');
    te.st(0, '<span><span>0</span></span>');

    te.st('1', '<span><span>1</span></span>');
    te.st('100', '<span><span>100</span></span>');
    te.st('10001', '<span><span>10</span><span>001</span></span>');
    te.st('-10001', '<span>-<span>10</span><span>001</span></span>');
    te.st('-10001.0', '<span>-<span>10</span><span>001</span>.0</span>');
    te.st('-10001.505', '<span>-<span>10</span><span>001</span>.505</span>');
    te.st('-0.505', '<span>-<span>0</span>.505</span>');
    te.st('0.505', '<span><span>0</span>.505</span>');
    te.st('0', '<span><span>0</span></span>');

    te.st('', '');
    te.st(' ', '');
    te.st(' 0', '<span><span>0</span></span>');
    te.st(' 1', '<span><span>1</span></span>');
    te.st('   -10001.505', '<span>-<span>10</span><span>001</span>.505</span>');

    res = te.nd(false, true);
})();

(function () {
    var triadTmpl = function(n) { return '<span>' + n + '</span>' };
    var concat = function(sign, triads, frac) {
        var val = triads.join('') + frac;
        return sign === '-' ? '(' + val + ')' : val;
    }
    var numberTmpl = triadTmpl;
    var te = new Te(function (num) {
        return formatNumber(num, triadTmpl, numberTmpl, concat);
    });

    te.st('   -10001.505', '<span>(<span>10</span><span>001</span>.505)</span>');
    
    te.nd(true, res);
})();

function Te (fn) {
    return {
        isAlright: true,
        okCount: 0,
        failCount: 0,
        st: function test(num, expected) {
            var result = fn(num);
            if (result === expected) {
                ++this.okCount;
                console.log('OK:   ' + fn.name + '(' + JSON.stringify(num) + ') === ' + JSON.stringify(expected));
            } else {
                ++this.failCount;
                console.error('FAIL: ' + fn.name + '(' + JSON.stringify(num) + ') === ' + result + '\n   // Expected: ' + JSON.stringify(expected));
                this.isAlright = false;
            }
        },
        nd: function final(shouldExit, prevRes) {
            this.isAlright || console.error(this.failCount + ' tests failed!');
            this.okCount && console.log(this.okCount + ' tests passed!');
            var res = this.isAlright && prevRes;
            if (shouldExit) {
                process.exit(res ? 0 : -1);
            } else {
                return res;
            }
        }
    }
}
