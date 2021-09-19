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

class KeyDetector{isEscPressed(e){return"key"in(e=e||window.event)?"Escape"===e.key||"Esc"===e.key:27===e.keyCode}}class RarbgAssistant{constructor(){this.requestCatcher=new XMLHttpRequestCatcher,this.trailersPage=new TrailersPage}initalize(){this.requestCatcher.register("/ajax.php?mode=trailers&mode2=list",this.trailersPage),document.addEventListener("DOMContentLoaded",function(){const e=new TrailerWindow;e.float(),document.onkeydown=function(t){(new KeyDetector).isEscPressed(t)&&e.close()}})}}class TrailersPage{invoke(e){const t=e.match(/(?<=id="trailer_)(\d+)/g);if(!t){const t="Couldn't find any trailer Id!";throw console.log(t,{payload:e}),t}t.forEach(e=>{document.querySelector(`#trailer_${e}`).querySelectorAll("a").forEach(e=>{let t=e.onclick;e.onclick=function(){return t(),!1}})})}}class TrailerWindow{constructor(){this.trailerModalNode=document.querySelector("#trailer_modal"),this.eventSubscribers=[]}float(){document.body.appendChild(this.trailerModalNode),this.trailerModalNode.classList.add("trailer-modal")}close(){$(this.trailerModalNode).jqmHide(),this.trailerModalNode.innerHTML=""}}class XMLHttpRequestCatcher{constructor(){const e=window.XMLHttpRequest.prototype.send,t=this;window.XMLHttpRequest.prototype.send=function(){const s=this,r=window.setInterval(function(){4==s.readyState&&(t.invokeActionIfExists(s),clearInterval(r))},1);return e.apply(this,[].slice.call(arguments))},this.lookupTable={}}register(e,t){e=new URL(`https://rarbg.to${e}`),this.lookupTable[e]=t}invokeActionIfExists(e){if(!e.responseURL)return;const t=new URL(e.responseURL);Object.keys(this.lookupTable).forEach(s=>{const r=new URL(s);if(r.pathname!==t.pathname)return;const o=Array.from(r.searchParams.keys()),a=Array.from(t.searchParams.keys());if(o.length>a.length)return;let n=0;o.forEach(e=>{n+=r.searchParams.get(e)===t.searchParams.get(e)}),n==o.length&&this.lookupTable[s].invoke(e.responseText)})}}const rarbgAssistant=new RarbgAssistant;rarbgAssistant.initalize();const styleNode=document.createElement("style");styleNode.type="text/css",styleNode.innerText=".trailer-modal{position:fixed!important}",document.head.appendChild(styleNode);