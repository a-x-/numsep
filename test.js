var formatNumber = require('.');
var num;
var isAlright = true;
var okCount = 0;
var failCount = 0;
var triadTmpl = function(n) { return '<span>' + n + '</span>' };
var numberTmpl = triadTmpl;
var test = function (num, expected) {
    var result = formatNumber(num, triadTmpl, numberTmpl);
    var isOk = result === expected;
    if (isOk) {
        ++okCount;
        console.log('OK:   formatNumber(' + JSON.stringify(num) + ') === ' + JSON.stringify(expected));
    } else {
        ++failCount;
        console.error('FAIL: formatNumber(' + JSON.stringify(num) + ') === ' + result + '\n    // Expected: ' + JSON.stringify(expected));
        isAlright = false;
    }
}

test('1', '<span><span>1</span></span>');
test('100', '<span><span>100</span></span>');
test('10001', '<span><span>10</span><span>001</span></span>');
test('-10001', '<span>-<span>10</span><span>001</span></span>');
test('-10001.0', '<span>-<span>10</span><span>001</span>.0</span>');
test('-10001.505', '<span>-<span>10</span><span>001</span>.505</span>');
test('-0.505', '<span>-<span>0</span>.505</span>');
test('0.505', '<span><span>0</span>.505</span>');

isAlright || console.error(failCount + ' tests failed!');
okCount && console.log(okCount + ' tests passed!');
process.exit(isAlright ? 0 : -1);
