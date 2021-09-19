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

class RarbgAssistant{constructor(){this.requestCatcher=new XMLHttpRequestCatcher,this.trailersPage=new TrailersPage}initalize(){this.requestCatcher.register("/ajax.php?mode=trailers&mode2=list",this.trailersPage)}}class TrailersPage{invoke(e){const t=e.match(/(?<=id="trailer_)(\d+)/g);if(!t){const t="Couldn't find any trailer Id!";throw console.log(t,{payload:e}),t}t.forEach(e=>{document.querySelector(`#trailer_${e}`).querySelectorAll("a").forEach(e=>{let t=e.onclick;e.onclick=function(){return t(),!1}})})}}class XMLHttpRequestCatcher{constructor(){const e=window.XMLHttpRequest.prototype.send,t=this;window.XMLHttpRequest.prototype.send=function(){const s=this,r=window.setInterval(function(){4==s.readyState&&(t.invokeActionIfExists(s),clearInterval(r))},1);return e.apply(this,[].slice.call(arguments))},this.lookupTable={}}register(e,t){e=new URL(`https://rarbg.to${e}`),this.lookupTable[e]=t}invokeActionIfExists(e){if(!e.responseURL)return;const t=new URL(e.responseURL);Object.keys(this.lookupTable).forEach(s=>{const r=new URL(s);if(r.pathname!==t.pathname)return;const a=Array.from(r.searchParams.keys()),n=Array.from(t.searchParams.keys());if(a.length>n.length)return;let o=0;a.forEach(e=>{o+=r.searchParams.get(e)===t.searchParams.get(e)}),o==a.length&&this.lookupTable[s].invoke(e.responseText)})}}const rarbgAssistant=new RarbgAssistant;rarbgAssistant.initalize();const styleNode=document.createElement("style");styleNode.type="text/css",styleNode.innerText="",document.head.appendChild(styleNode);