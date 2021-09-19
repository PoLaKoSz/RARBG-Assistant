// ==UserScript==
// @name         RARBG Assistant
// @namespace    https://github.com/PoLaKoSz
// @version      1.0.0
// @description  Userscript for RARBG.to to make it more user friendly.
// @author       Tom PoLáKoSz
// @icon         https://raw.githubusercontent.com/PoLaKoSz/RARBG-Assistant/master/assets/icon.png
// @run-at       document-start
// @include      https://rarbg.to/trailers.php*
// ==/UserScript==

'use strict';

console.log("Hello, world!");const styleNode=document.createElement("style");styleNode.type="text/css",styleNode.innerText="",document.head.appendChild(styleNode);