# numsep [![Build Status](https://travis-ci.org/a-x-/numsep.svg?branch=master)](https://travis-ci.org/a-x-/numsep)
Format numbers.

Split onto triads &amp; wrap with html-elements instead of inserting space separators.

**Perfect UX**: copying gives no any separators in clipboard.


## usage

```js
var triadTmpl = n => `<span>${n}</span>`;
var numTmpl = triadTmpl;
var formatNumber = num => require('numsep')(num, triadTmpl, numTmpl);

formatNumber(1) === "<span><span>1</span></span>"
formatNumber(100) === "<span><span>100</span></span>"
formatNumber(10001) === "<span><span>10</span><span>001</span></span>"
formatNumber(-10001) === "<span>-<span>10</span><span>001</span></span>"
formatNumber(-10001.0) === "<span>-<span>10</span><span>001</span></span>"
formatNumber("-10001.0") === "<span>-<span>10</span><span>001</span>.0</span>"
formatNumber(-10001.505) === "<span>-<span>10</span><span>001</span>.505</span>"
formatNumber("-10001.505") === "<span>-<span>10</span><span>001</span>.505</span>"
formatNumber(-0.505) === "<span>-<span>0</span>.505</span>"
formatNumber("-0.505") === "<span>-<span>0</span>.505</span>"
formatNumber("0.505") === "<span><span>0</span>.505</span>"
```

## style

Dirty simple css:

```css
div { text-align: right }
span + span { margin-left: .3em }
```

Result:

<img src="https://cloud.githubusercontent.com/assets/6201068/24832059/3f4a91a2-1cb0-11e7-82cc-6c548310dd59.png"  height="260"/>
