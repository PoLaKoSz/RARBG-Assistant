// ==UserScript==
// @name         RARBG Assistant
// @namespace    https://github.com/PoLaKoSz
// @version      1.6.0
// @description  Userscript for RARBG.to to make it more user friendly.
// @author       Tom PoLáKoSz
// @icon         https://raw.githubusercontent.com/PoLaKoSz/RARBG-Assistant/master/assets/icon.png
// @run-at       document-start
// @include      https://rarbg.to/trailers.php*
// ==/UserScript==

'use strict';

class KeyDetector{isEscPressed(e){return"key"in(e=e||window.event)?"Escape"===e.key||"Esc"===e.key:27===e.keyCode}}class RarbgAssistant{constructor(){this.requestCatcher=new XMLHttpRequestCatcher,this.trailersPage=new TrailersPage}initalize(){this.requestCatcher.register("/ajax.php?mode=trailers&mode2=list",this.trailersPage),document.addEventListener("DOMContentLoaded",function(){const e=new TrailerWindow;e.float(),e.onOpen([{instance:e,method:e.addSearchButton},{instance:e,method:e.fixOverlayForAdblockers}]),document.onkeydown=function(t){(new KeyDetector).isEscPressed(t)&&e.close()}})}}class TrailersPage{invoke(e){const t=e.match(/(?<=id="trailer_)(\d+)/g);if(!t){const t="Couldn't find any trailer Id!";throw console.log(t,{payload:e}),t}t.forEach(e=>{document.querySelector(`#trailer_${e}`).querySelectorAll("a").forEach(e=>{let t=e.onclick;e.onclick=function(){return t(),!1}})})}}class TrailerWindow{constructor(){this.trailerModalNode=document.querySelector("#trailer_modal"),this.eventSubscribers=[]}float(){document.body.appendChild(this.trailerModalNode),this.trailerModalNode.classList.add("trailer-modal")}close(){$(this.trailerModalNode).jqmHide(),this.trailerModalNode.innerHTML=""}onOpen(e){this.eventSubscribers=e,this.attachEventToWindowOpen()}addSearchButton(e){const t=e.trailerModalNode.querySelector("table:nth-child(3) > tbody > tr > td:nth-child(1)"),r=t.querySelector("b"),n=`\n      <span>\n        <a href="https://rarbg.to/torrents.php?search=${r.innerText}" target="_blank">\n          <i class="icon-search"></i>\n          Search for ${r.innerText}\n        </a>\n      </span>\n      `;t.innerHTML+=n}attachEventToWindowOpen(){const e=jQuery.fn.jqm,t=this.eventSubscribers;jQuery.fn.jqm=function(){return arguments[0].onLoad=function(){t.forEach(e=>{e.method(e.instance)})},e.apply(this,arguments)}}fixOverlayForAdblockers(){const e=document.querySelector(".jqmOverlay");e.classList.remove("jqmOverlay"),e.style.backgroundColor="#000"}}class XMLHttpRequestCatcher{constructor(){const e=window.XMLHttpRequest.prototype.send,t=this;window.XMLHttpRequest.prototype.send=function(){const r=this,n=window.setInterval(function(){4==r.readyState&&(t.invokeActionIfExists(r),clearInterval(n))},1);return e.apply(this,[].slice.call(arguments))},this.lookupTable={}}register(e,t){e=new URL(`https://rarbg.to${e}`),this.lookupTable[e]=t}invokeActionIfExists(e){if(!e.responseURL)return;const t=new URL(e.responseURL);Object.keys(this.lookupTable).forEach(r=>{const n=new URL(r);if(n.pathname!==t.pathname)return;const s=Array.from(n.searchParams.keys()),o=Array.from(t.searchParams.keys());if(s.length>o.length)return;let a=0;s.forEach(e=>{a+=n.searchParams.get(e)===t.searchParams.get(e)}),a==s.length&&this.lookupTable[r].invoke(e.responseText)})}}const rarbgAssistant=new RarbgAssistant;rarbgAssistant.initalize();const styleNode=document.createElement("style");styleNode.type="text/css",styleNode.innerText=".trailer-modal{position:fixed!important}",document.head.appendChild(styleNode);