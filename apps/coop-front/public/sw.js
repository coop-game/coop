if(!self.define){let e,a={};const i=(i,n)=>(i=new URL(i+".js",n).href,a[i]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=a,document.head.appendChild(e)}else e=i,importScripts(i),a()})).then((()=>{let e=a[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,s)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(a[c])return;let r={};const t=e=>i(e,c),o={module:{uri:c},exports:r,require:t};a[c]=Promise.all(n.map((e=>o[e]||t(e)))).then((e=>(s(...e),r)))}}define(["./workbox-c5ed321c"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/145.7f0e9b0018674671.js",revision:"7f0e9b0018674671"},{url:"/_next/static/chunks/164.0ef12e5b508a6201.js",revision:"0ef12e5b508a6201"},{url:"/_next/static/chunks/212-492c37bc92b4e89b.js",revision:"492c37bc92b4e89b"},{url:"/_next/static/chunks/33.d661786f172797db.js",revision:"d661786f172797db"},{url:"/_next/static/chunks/334.9aa06b68c3c4c787.js",revision:"9aa06b68c3c4c787"},{url:"/_next/static/chunks/345-ea9af47d3d58500c.js",revision:"ea9af47d3d58500c"},{url:"/_next/static/chunks/380.3e8131346397c2e6.js",revision:"3e8131346397c2e6"},{url:"/_next/static/chunks/443-053ae5443273c615.js",revision:"053ae5443273c615"},{url:"/_next/static/chunks/545.bedcc4db2473b373.js",revision:"bedcc4db2473b373"},{url:"/_next/static/chunks/655.948b9c409f98e2ee.js",revision:"948b9c409f98e2ee"},{url:"/_next/static/chunks/752-c234813114fd8fbf.js",revision:"c234813114fd8fbf"},{url:"/_next/static/chunks/850-ad548633d6035f32.js",revision:"ad548633d6035f32"},{url:"/_next/static/chunks/8fe5539e.8ace327b343270be.js",revision:"8ace327b343270be"},{url:"/_next/static/chunks/91bbf309-f3bcffc40200c83c.js",revision:"f3bcffc40200c83c"},{url:"/_next/static/chunks/942.ff4531ac1e0427e6.js",revision:"ff4531ac1e0427e6"},{url:"/_next/static/chunks/954.ee3d15f64711ace4.js",revision:"ee3d15f64711ace4"},{url:"/_next/static/chunks/977.f2369f281b266147.js",revision:"f2369f281b266147"},{url:"/_next/static/chunks/999-4c6319743d5ab83b.js",revision:"4c6319743d5ab83b"},{url:"/_next/static/chunks/framework-22108eb722d84e59.js",revision:"22108eb722d84e59"},{url:"/_next/static/chunks/main-6c1a964473bd9e1e.js",revision:"6c1a964473bd9e1e"},{url:"/_next/static/chunks/pages/404-fd24d84ad0c73d63.js",revision:"fd24d84ad0c73d63"},{url:"/_next/static/chunks/pages/ErrorPage-6e972146728be851.js",revision:"6e972146728be851"},{url:"/_next/static/chunks/pages/_app-0dd3d164995f6833.js",revision:"0dd3d164995f6833"},{url:"/_next/static/chunks/pages/_error-15a0bbaa3c2350f1.js",revision:"15a0bbaa3c2350f1"},{url:"/_next/static/chunks/pages/draw-296c374440c7e491.js",revision:"296c374440c7e491"},{url:"/_next/static/chunks/pages/example-bcfeac045d7c6fcb.js",revision:"bcfeac045d7c6fcb"},{url:"/_next/static/chunks/pages/games/drawee-eae0b8880d3ff911.js",revision:"eae0b8880d3ff911"},{url:"/_next/static/chunks/pages/games/relay-race-6d05e59338da3f86.js",revision:"6d05e59338da3f86"},{url:"/_next/static/chunks/pages/index-31ff53cf64d1ad58.js",revision:"31ff53cf64d1ad58"},{url:"/_next/static/chunks/pages/lobby-3396e5133b90d821.js",revision:"3396e5133b90d821"},{url:"/_next/static/chunks/pages/result-d2ef232e34e40aea.js",revision:"d2ef232e34e40aea"},{url:"/_next/static/chunks/pages/start-66cc7098cd086f48.js",revision:"66cc7098cd086f48"},{url:"/_next/static/chunks/pages/welcome-ebf61676756b6083.js",revision:"ebf61676756b6083"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-f6c0048589ac59ee.js",revision:"f6c0048589ac59ee"},{url:"/_next/static/css/a2bde8e4a12d139c.css",revision:"a2bde8e4a12d139c"},{url:"/_next/static/media/jua-10-400-normal.4bac79b0.woff2",revision:"4bac79b0"},{url:"/_next/static/media/jua-100-400-normal.18ff28aa.woff2",revision:"18ff28aa"},{url:"/_next/static/media/jua-101-400-normal.8d606cdf.woff2",revision:"8d606cdf"},{url:"/_next/static/media/jua-102-400-normal.a6a652c1.woff2",revision:"a6a652c1"},{url:"/_next/static/media/jua-103-400-normal.f3e850e1.woff2",revision:"f3e850e1"},{url:"/_next/static/media/jua-104-400-normal.9c00857c.woff2",revision:"9c00857c"},{url:"/_next/static/media/jua-105-400-normal.72736441.woff2",revision:"72736441"},{url:"/_next/static/media/jua-106-400-normal.65e1ade2.woff2",revision:"65e1ade2"},{url:"/_next/static/media/jua-107-400-normal.8c3dc85e.woff2",revision:"8c3dc85e"},{url:"/_next/static/media/jua-108-400-normal.c2db7e00.woff2",revision:"c2db7e00"},{url:"/_next/static/media/jua-109-400-normal.9fcaed15.woff2",revision:"9fcaed15"},{url:"/_next/static/media/jua-11-400-normal.da4d9d14.woff2",revision:"da4d9d14"},{url:"/_next/static/media/jua-110-400-normal.7a8d0dc3.woff2",revision:"7a8d0dc3"},{url:"/_next/static/media/jua-111-400-normal.9e8d749a.woff2",revision:"9e8d749a"},{url:"/_next/static/media/jua-112-400-normal.db78a301.woff2",revision:"db78a301"},{url:"/_next/static/media/jua-113-400-normal.d2f4729d.woff2",revision:"d2f4729d"},{url:"/_next/static/media/jua-114-400-normal.29731695.woff2",revision:"29731695"},{url:"/_next/static/media/jua-115-400-normal.9b1b2f6d.woff2",revision:"9b1b2f6d"},{url:"/_next/static/media/jua-116-400-normal.b67d4016.woff2",revision:"b67d4016"},{url:"/_next/static/media/jua-117-400-normal.ca82af3e.woff2",revision:"ca82af3e"},{url:"/_next/static/media/jua-118-400-normal.3902b15a.woff2",revision:"3902b15a"},{url:"/_next/static/media/jua-119-400-normal.8126fc50.woff2",revision:"8126fc50"},{url:"/_next/static/media/jua-12-400-normal.2ac871bc.woff2",revision:"2ac871bc"},{url:"/_next/static/media/jua-13-400-normal.6de076fe.woff2",revision:"6de076fe"},{url:"/_next/static/media/jua-14-400-normal.e858ca26.woff2",revision:"e858ca26"},{url:"/_next/static/media/jua-15-400-normal.900cca10.woff2",revision:"900cca10"},{url:"/_next/static/media/jua-16-400-normal.402f6a71.woff2",revision:"402f6a71"},{url:"/_next/static/media/jua-17-400-normal.07565e02.woff2",revision:"07565e02"},{url:"/_next/static/media/jua-18-400-normal.5ba3d60f.woff2",revision:"5ba3d60f"},{url:"/_next/static/media/jua-19-400-normal.06a1cb1c.woff2",revision:"06a1cb1c"},{url:"/_next/static/media/jua-2-400-normal.5f0242fe.woff2",revision:"5f0242fe"},{url:"/_next/static/media/jua-20-400-normal.fbbb15b4.woff2",revision:"fbbb15b4"},{url:"/_next/static/media/jua-21-400-normal.597dc045.woff2",revision:"597dc045"},{url:"/_next/static/media/jua-22-400-normal.42d0154b.woff2",revision:"42d0154b"},{url:"/_next/static/media/jua-23-400-normal.df56b8fd.woff2",revision:"df56b8fd"},{url:"/_next/static/media/jua-24-400-normal.eed63072.woff2",revision:"eed63072"},{url:"/_next/static/media/jua-25-400-normal.154afe33.woff2",revision:"154afe33"},{url:"/_next/static/media/jua-26-400-normal.cdbee601.woff2",revision:"cdbee601"},{url:"/_next/static/media/jua-27-400-normal.6db1550a.woff2",revision:"6db1550a"},{url:"/_next/static/media/jua-28-400-normal.5cb810c9.woff2",revision:"5cb810c9"},{url:"/_next/static/media/jua-29-400-normal.caeb2cab.woff2",revision:"caeb2cab"},{url:"/_next/static/media/jua-3-400-normal.b67f3599.woff2",revision:"b67f3599"},{url:"/_next/static/media/jua-30-400-normal.2e3a077f.woff2",revision:"2e3a077f"},{url:"/_next/static/media/jua-31-400-normal.a4355695.woff2",revision:"a4355695"},{url:"/_next/static/media/jua-32-400-normal.65b3f178.woff2",revision:"65b3f178"},{url:"/_next/static/media/jua-33-400-normal.9dd600a2.woff2",revision:"9dd600a2"},{url:"/_next/static/media/jua-34-400-normal.532426b3.woff2",revision:"532426b3"},{url:"/_next/static/media/jua-35-400-normal.7df9962d.woff2",revision:"7df9962d"},{url:"/_next/static/media/jua-36-400-normal.42d55396.woff2",revision:"42d55396"},{url:"/_next/static/media/jua-37-400-normal.1b2d791e.woff2",revision:"1b2d791e"},{url:"/_next/static/media/jua-38-400-normal.691fd01b.woff2",revision:"691fd01b"},{url:"/_next/static/media/jua-39-400-normal.2357b3ea.woff2",revision:"2357b3ea"},{url:"/_next/static/media/jua-4-400-normal.5760670b.woff2",revision:"5760670b"},{url:"/_next/static/media/jua-40-400-normal.774bb06b.woff2",revision:"774bb06b"},{url:"/_next/static/media/jua-41-400-normal.f0513dfa.woff2",revision:"f0513dfa"},{url:"/_next/static/media/jua-42-400-normal.adc252e8.woff2",revision:"adc252e8"},{url:"/_next/static/media/jua-43-400-normal.46548963.woff2",revision:"46548963"},{url:"/_next/static/media/jua-44-400-normal.518640b9.woff2",revision:"518640b9"},{url:"/_next/static/media/jua-45-400-normal.912e44de.woff2",revision:"912e44de"},{url:"/_next/static/media/jua-46-400-normal.319efa7e.woff2",revision:"319efa7e"},{url:"/_next/static/media/jua-47-400-normal.a30a3dbb.woff2",revision:"a30a3dbb"},{url:"/_next/static/media/jua-48-400-normal.6d743c2e.woff2",revision:"6d743c2e"},{url:"/_next/static/media/jua-49-400-normal.2951bcdd.woff2",revision:"2951bcdd"},{url:"/_next/static/media/jua-5-400-normal.a24988f8.woff2",revision:"a24988f8"},{url:"/_next/static/media/jua-50-400-normal.f0a54adb.woff2",revision:"f0a54adb"},{url:"/_next/static/media/jua-51-400-normal.3c620c2b.woff2",revision:"3c620c2b"},{url:"/_next/static/media/jua-52-400-normal.59bf60f8.woff2",revision:"59bf60f8"},{url:"/_next/static/media/jua-53-400-normal.6f02c4e7.woff2",revision:"6f02c4e7"},{url:"/_next/static/media/jua-54-400-normal.5ba50f7f.woff2",revision:"5ba50f7f"},{url:"/_next/static/media/jua-55-400-normal.e9eef1f6.woff2",revision:"e9eef1f6"},{url:"/_next/static/media/jua-56-400-normal.4d31e137.woff2",revision:"4d31e137"},{url:"/_next/static/media/jua-57-400-normal.43dbc8bd.woff2",revision:"43dbc8bd"},{url:"/_next/static/media/jua-58-400-normal.46488acc.woff2",revision:"46488acc"},{url:"/_next/static/media/jua-59-400-normal.45286bc5.woff2",revision:"45286bc5"},{url:"/_next/static/media/jua-6-400-normal.a339826e.woff2",revision:"a339826e"},{url:"/_next/static/media/jua-60-400-normal.6c2c2857.woff2",revision:"6c2c2857"},{url:"/_next/static/media/jua-61-400-normal.c9dc09de.woff2",revision:"c9dc09de"},{url:"/_next/static/media/jua-62-400-normal.de1855fe.woff2",revision:"de1855fe"},{url:"/_next/static/media/jua-63-400-normal.3b6ac46b.woff2",revision:"3b6ac46b"},{url:"/_next/static/media/jua-64-400-normal.ad4c2ede.woff2",revision:"ad4c2ede"},{url:"/_next/static/media/jua-65-400-normal.acfccefb.woff2",revision:"acfccefb"},{url:"/_next/static/media/jua-7-400-normal.dd541d8a.woff2",revision:"dd541d8a"},{url:"/_next/static/media/jua-8-400-normal.3ec80967.woff2",revision:"3ec80967"},{url:"/_next/static/media/jua-9-400-normal.3ded1a21.woff2",revision:"3ded1a21"},{url:"/_next/static/media/jua-94-400-normal.364dcbc1.woff2",revision:"364dcbc1"},{url:"/_next/static/media/jua-95-400-normal.ebf3396c.woff2",revision:"ebf3396c"},{url:"/_next/static/media/jua-all-400-normal.50740287.woff",revision:"50740287"},{url:"/_next/static/zfcVD-LzKZA1xTpXPV45b/_buildManifest.js",revision:"923803f396826eb41cce46b2d1b38c71"},{url:"/_next/static/zfcVD-LzKZA1xTpXPV45b/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/favicon-16x16.png",revision:"18179987d2225d05e125da28f4b169b8"},{url:"/favicon-32x32.png",revision:"0067dd2f415bc1903083ac3ba8ddce76"},{url:"/icons/icon-128x128.png",revision:"16b5243f8c3d32538dcfe22c68d46412"},{url:"/icons/icon-144x144.png",revision:"7415859b9482b1a8c70eb3e818b4808d"},{url:"/icons/icon-152x152.png",revision:"01621aa3f6ddeac15bfd32c27fd08462"},{url:"/icons/icon-192x192.png",revision:"70dbc4d90f6cfc7d00b175312d65d415"},{url:"/icons/icon-384x384.png",revision:"1f280375dc1d379da3d5260f3a79e955"},{url:"/icons/icon-48x48.png",revision:"591dd2d1d9f7b1ef39c88f426c6daad5"},{url:"/icons/icon-512x512.png",revision:"f98998e2ddb146c721bc821d10b92b95"},{url:"/icons/icon-72x72.png",revision:"9ca165d6024999e2fc73fcaf1508cc62"},{url:"/icons/icon-96x96.png",revision:"670f7083759f1c839104a5b84d97de75"},{url:"/images/45-degree-fabric-light.png",revision:"ac1839b05d92a3c9818f9063ad10098e"},{url:"/images/DraweeLogo.png",revision:"df283915b8d724253337aca69f617739"},{url:"/images/avatar/0.png",revision:"bac348583721c378fe8494fbe47c0a89"},{url:"/images/avatar/1.png",revision:"197a066c6b8fa4a00e60b5c656868ea7"},{url:"/images/avatar/2.png",revision:"1ee08d8f761d2d19fe36012afc035b4c"},{url:"/images/avatar/3.png",revision:"4818b94af1f6c354d0c574694ea770af"},{url:"/images/avatar/4.png",revision:"b2ece2ea21853bf45008554475b182a0"},{url:"/images/avatar/5.png",revision:"cc7e4334603d242579527661a27105a2"},{url:"/images/avatar/6.png",revision:"c1b68e8ec755b39005b57f4ecc2931d1"},{url:"/images/avatar/7.png",revision:"e8fffd0dade1f5f5d00cb237d5b9d044"},{url:"/images/avatar/8.png",revision:"bfc99014a32db7a84673ad8fa545eabf"},{url:"/images/avatar/9.png",revision:"dd31948a5f240f239b219bee7043696e"},{url:"/images/paper4.jpg",revision:"c69715a57a2c5fddf91addbe2d5a37f1"},{url:"/images/pencil/cursor.png",revision:"3c24491a62d31aa8e19dc9d1862c5ce2"},{url:"/images/pencil/pencilBody.png",revision:"feb8582d788e654b2140d613e5cc736d"},{url:"/images/pencil/pencilBottom.png",revision:"7580b6e2ea23afc57973bc864c43d847"},{url:"/images/pencil/pencilTop.png",revision:"e79044bc59c28342fdf311a6cb800f5d"},{url:"/images/pin.png",revision:"7722f0fb06a9d245c8635ae73fbe6a38"},{url:"/images/stop.svg",revision:"dd3f719c72b8210daa09edb39ad15e07"},{url:"/images/users/user1.png",revision:"5595aa4eb42647e0667ddd905b93d17c"},{url:"/images/users/user10.png",revision:"6ab4606de03d2278cd05826b888ce978"},{url:"/images/users/user2.png",revision:"756062259125346a34e8a4c8090d0bdc"},{url:"/images/users/user3.png",revision:"44e1883ba48c2660cb3b6cc18e806bb0"},{url:"/images/users/user4.png",revision:"f1df71ad851695f7c295ed00c9a26fe8"},{url:"/images/users/user5.png",revision:"b6982c32f933dc81172128b17860cff5"},{url:"/images/users/user6.png",revision:"ff7ba060aded75bb0678e95caced0d15"},{url:"/images/users/user7.png",revision:"f17f7f5fdbdbd7dd0a2b49b84bf51346"},{url:"/images/users/user8.png",revision:"81cf5545ac807c3ced75c15c29c08f32"},{url:"/images/users/user9.png",revision:"42809d46f58c483601c2ea253bd599b9"},{url:"/images/volume/volume-mute.svg",revision:"b56fa0b712d873f03810cb5c17074205"},{url:"/images/volume/volume-up.svg",revision:"4c78d8f15d9ed0190eedfc99d1eddbe7"},{url:"/images/writingToolsIcon/eraser_white.png",revision:"ed67de8298fff64b307d4c7975139e1f"},{url:"/images/writingToolsIcon/long_pencil_colorful.png",revision:"2fb1f05ceda511e4c1ca3a2ad6e54de6"},{url:"/images/writingToolsIcon/long_pencil_colorful_front_add.png",revision:"c455319bef117bd1610fe10e8250117b"},{url:"/images/writingToolsIcon/pencil_colorful.png",revision:"95127f3cad929b6e4639b59b64359793"},{url:"/images/writingToolsIcon/spiral_book_and_pencil.png",revision:"518c361695c2dd864e5c80226efef77e"},{url:"/images/writingToolsIcon/spiral_book_white.png",revision:"2843a8c36c3cc99c90189698a906f608"},{url:"/images/writingToolsIcon/star_red_rotate.png",revision:"4736935a06186986fe9695c1f9e523c9"},{url:"/locales/en/common.json",revision:"f96105cf01b96f22ebd30a207f79a8b1"},{url:"/locales/ko/common.json",revision:"a699ed4eb93a549455656a1f5de15da4"},{url:"/manifest.json",revision:"df313bd6f3211f03cfb60817755a702c"},{url:"/robots.txt",revision:"6af4622bcae3596255b6407c6a8ae167"},{url:"/sitemap-0.xml",revision:"9b5e4062d5953c53bb26b34b294e9705"},{url:"/sitemap.xml",revision:"8cd70b37e68a4ba2b92acb4b834ca7c6"},{url:"/sound/Swoosh.mp3",revision:"302cf8e14503e7f471a3da8b7650f328"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:i,state:n})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
