const m=function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function a(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerpolicy&&(n.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?n.credentials="include":e.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(e){if(e.ep)return;e.ep=!0;const n=a(e);fetch(e.href,n)}};m();const y="modulepreload",c={},f="/audioVis/",s=function(i,a){return!a||a.length===0?i():Promise.all(a.map(o=>{if(o=`${f}${o}`,o in c)return;c[o]=!0;const e=o.endsWith(".css"),n=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${o}"]${n}`))return;const r=document.createElement("link");if(r.rel=e?"stylesheet":y,e||(r.as="script",r.crossOrigin=""),r.href=o,document.head.appendChild(r),e)return new Promise((d,u)=>{r.addEventListener("load",d),r.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${o}`)))})})).then(()=>i())};let l=[s(()=>import("./circle-bars.8daf7c2a.js"),[]),s(()=>import("./bars.8c6a4baa.js"),[]),s(()=>import("./blocks.4bca49bc.js"),[]),s(()=>import("./field.583be4a3.js"),[])];document.addEventListener("DOMContentLoaded",async()=>{l=await Promise.all(l);const t={audioContext:new(window.AudioContext||window.webkitAudioContext),audio:document.getElementById("audio"),canvas:document.getElementById("canvas"),frame:-1};t.audioSrc=t.audioContext.createMediaElementSource(t.audio),t.analyser=t.audioContext.createAnalyser(),t.frequencyData=new Uint8Array(t.analyser.frequencyBinCount),t.audioSrc.connect(t.analyser),t.analyser.connect(t.audioContext.destination),t.c=canvas.getContext("2d"),document.getElementById("ready").innerHTML="Ready!",document.getElementById("ui").style.backgroundColor="green",document.getElementById("player").style.display="block",document.getElementById("player").addEventListener("click",()=>{document.getElementById("ui").style.display="none";const i=l[Math.floor(Math.random()*l.length)];(i.initialFunction||i.loopingFunction)(t),audio.play()})});
