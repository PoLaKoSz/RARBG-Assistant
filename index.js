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

class RarbgAssistant{constructor(){this.requestCatcher=new XMLHttpRequestCatcher,this.trailersPage=new TrailersPage}initalize(){this.requestCatcher.register("/ajax.php?mode=trailers&mode2=list",this.trailersPage),document.addEventListener("DOMContentLoaded",function(){(new TrailerWindow).float()})}}class TrailersPage{invoke(e){const t=e.match(/(?<=id="trailer_)(\d+)/g);if(!t){const t="Couldn't find any trailer Id!";throw console.log(t,{payload:e}),t}t.forEach(e=>{document.querySelector(`#trailer_${e}`).querySelectorAll("a").forEach(e=>{let t=e.onclick;e.onclick=function(){return t(),!1}})})}}class TrailerWindow{constructor(){this.trailerModalNode=document.querySelector("#trailer_modal"),this.eventSubscribers=[]}float(){document.body.appendChild(this.trailerModalNode),this.trailerModalNode.classList.add("trailer-modal")}}class XMLHttpRequestCatcher{constructor(){const e=window.XMLHttpRequest.prototype.send,t=this;window.XMLHttpRequest.prototype.send=function(){const r=this,s=window.setInterval(function(){4==r.readyState&&(t.invokeActionIfExists(r),clearInterval(s))},1);return e.apply(this,[].slice.call(arguments))},this.lookupTable={}}register(e,t){e=new URL(`https://rarbg.to${e}`),this.lookupTable[e]=t}invokeActionIfExists(e){if(!e.responseURL)return;const t=new URL(e.responseURL);Object.keys(this.lookupTable).forEach(r=>{const s=new URL(r);if(s.pathname!==t.pathname)return;const a=Array.from(s.searchParams.keys()),o=Array.from(t.searchParams.keys());if(a.length>o.length)return;let n=0;a.forEach(e=>{n+=s.searchParams.get(e)===t.searchParams.get(e)}),n==a.length&&this.lookupTable[r].invoke(e.responseText)})}}const rarbgAssistant=new RarbgAssistant;rarbgAssistant.initalize();const styleNode=document.createElement("style");styleNode.type="text/css",styleNode.innerText=".trailer-modal{position:fixed!important}",document.head.appendChild(styleNode);