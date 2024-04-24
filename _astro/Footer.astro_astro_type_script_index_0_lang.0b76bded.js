const Be=[],$e=[],Ie=[];let ae="en",L="task_assigner_data";class f{static Helpers;constructor(){}static handleAddBtnClick(e,o,r){const n=f.getBtn(e,o);return n?.addEventListener("click",r),n}static getBtn(e,o){return e.querySelector(o)}static capitalizeFirstLetter(e){return e.charAt(0).toUpperCase()+e.slice(1)}static removeLastLetter(e){return e=e.slice(0,-1)}static getTodayDate(e){const o=new Date,r=o.getFullYear(),n=String(o.getMonth()+1).padStart(2,"0"),a=String(o.getDate()).padStart(2,"0"),u=String(o.getHours()).padStart(2,"0"),c=String(o.getMinutes()).padStart(2,"0"),s=String(o.getSeconds()).padStart(2,"0");switch(e){case!0:return`${r}${n}${a}_${u}${c}${s}`;case!1:return`${r}-${n}-${a}`}}static saveToLocalStorage(e,o){try{const r=JSON.stringify(o);localStorage.setItem(e,r)}catch{}}static loadFromLocalStorage(e){try{const o=localStorage.getItem(e);return o===null?null:JSON.parse(o)}catch{return null}}static changeValueFromId(e,o,r){const n=f.loadFromLocalStorage(L).history,a=e.slice(0,15),u=n.filter(i=>i.id===a),c=u[0].results;for(const i in c)c.hasOwnProperty(i)&&c[i].hasOwnProperty("id")&&c[i].id===e&&(c[i].checked=!c[i].checked);const s=n.map(i=>i.id===u[0].id?u[0]:i),m={lang:ae,darkMode:f.getDarkModeUserPreference({save:!1}),theme:f.getThemeUserPreference({save:!1}),history:s};f.saveToLocalStorage(L,m)}static getDarkModeUserPreference({save:e}){const r=document.getElementById("darkModeSwitch").checked,n=window.matchMedia("(prefers-color-scheme: dark)").matches;let a={userDarkMode:r,navDarkMode:n};if(e===!0){const c={...f.loadFromLocalStorage(L),darkMode:a};f.saveToLocalStorage(L,c)}return a}static getThemeUserPreference({save:e}){const o=document.documentElement.dataset.themeGeneral;if(e===!0){const n={...f.loadFromLocalStorage(L),theme:o};f.saveToLocalStorage(L,n)}return o}static async getLangUserPreference({save:e}){try{const o=document.documentElement.lang;if(e===!0){const n={...f.loadFromLocalStorage(L),lang:o};f.saveToLocalStorage(L,n)}return o}catch{}}static getTourUserPreference({save:e}){const o=f.loadFromLocalStorage(L).tour||!0;if(e===!0){const n={...f.loadFromLocalStorage(L),tour:o};f.saveToLocalStorage(L,n)}return o}static detectTouchscreen(){var e=!1;return window.PointerEvent&&"maxTouchPoints"in navigator?navigator.maxTouchPoints>0&&(e=!0):(window.matchMedia&&window.matchMedia("(any-pointer:coarse)").matches||window.TouchEvent||"ontouchstart"in window)&&(e=!0),e}}let U={};function q(t={}){U={animate:!0,allowClose:!0,overlayOpacity:.7,smoothScroll:!1,disableActiveInteraction:!1,showProgress:!1,stagePadding:10,stageRadius:5,popoverOffset:10,showButtons:["next","previous","close"],disableButtons:[],overlayColor:"#000",...t}}function l(t){return t?U[t]:U}function W(t,e,o,r){return(t/=r/2)<1?o/2*t*t+e:-o/2*(--t*(t-2)-1)+e}function J(t){const e='a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])';return t.flatMap(o=>{const r=o.matches(e),n=Array.from(o.querySelectorAll(e));return[...r?[o]:[],...n]}).filter(o=>getComputedStyle(o).pointerEvents!=="none"&&ce(o))}function X(t){if(!t||de(t))return;const e=l("smoothScroll");t.scrollIntoView({behavior:!e||le(t)?"auto":"smooth",inline:"center",block:"center"})}function le(t){if(!t||!t.parentElement)return;const e=t.parentElement;return e.scrollHeight>e.clientHeight}function de(t){const e=t.getBoundingClientRect();return e.top>=0&&e.left>=0&&e.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&e.right<=(window.innerWidth||document.documentElement.clientWidth)}function ce(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)}let R={};function S(t,e){R[t]=e}function d(t){return t?R[t]:R}function z(){R={}}let O={};function F(t,e){O[t]=e}function A(t){var e;(e=O[t])==null||e.call(O)}function ue(){O={}}function pe(t,e,o,r){let n=d("__activeStagePosition");const a=n||o.getBoundingClientRect(),u=r.getBoundingClientRect(),c=W(t,a.x,u.x-a.x,e),s=W(t,a.y,u.y-a.y,e),m=W(t,a.width,u.width-a.width,e),i=W(t,a.height,u.height-a.height,e);n={x:c,y:s,width:m,height:i},Z(n),S("__activeStagePosition",n)}function Y(t){if(!t)return;const e=t.getBoundingClientRect(),o={x:e.x,y:e.y,width:e.width,height:e.height};S("__activeStagePosition",o),Z(o)}function ve(){const t=d("__activeStagePosition"),e=d("__overlaySvg");if(!t)return;if(!e){console.warn("No stage svg found.");return}const o=window.innerWidth,r=window.innerHeight;e.setAttribute("viewBox",`0 0 ${o} ${r}`)}function he(t){const e=me(t);document.body.appendChild(e),oe(e,o=>{o.target.tagName==="path"&&A("overlayClick")}),S("__overlaySvg",e)}function Z(t){const e=d("__overlaySvg");if(!e){he(t);return}const o=e.firstElementChild;if(o?.tagName!=="path")throw new Error("no path element found in stage svg");o.setAttribute("d",ee(t))}function me(t){const e=window.innerWidth,o=window.innerHeight,r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.classList.add("driver-overlay","driver-overlay-animated"),r.setAttribute("viewBox",`0 0 ${e} ${o}`),r.setAttribute("xmlSpace","preserve"),r.setAttribute("xmlnsXlink","http://www.w3.org/1999/xlink"),r.setAttribute("version","1.1"),r.setAttribute("preserveAspectRatio","xMinYMin slice"),r.style.fillRule="evenodd",r.style.clipRule="evenodd",r.style.strokeLinejoin="round",r.style.strokeMiterlimit="2",r.style.zIndex="10000",r.style.position="fixed",r.style.top="0",r.style.left="0",r.style.width="100%",r.style.height="100%";const n=document.createElementNS("http://www.w3.org/2000/svg","path");return n.setAttribute("d",ee(t)),n.style.fill=l("overlayColor")||"rgb(0,0,0)",n.style.opacity=`${l("overlayOpacity")}`,n.style.pointerEvents="auto",n.style.cursor="auto",r.appendChild(n),r}function ee(t){const e=window.innerWidth,o=window.innerHeight,r=l("stagePadding")||0,n=l("stageRadius")||0,a=t.width+r*2,u=t.height+r*2,c=Math.min(n,a/2,u/2),s=Math.floor(Math.max(c,0)),m=t.x-r+s,i=t.y-r,p=a-s*2,v=u-s*2;return`M${e},0L0,0L0,${o}L${e},${o}L${e},0Z
    M${m},${i} h${p} a${s},${s} 0 0 1 ${s},${s} v${v} a${s},${s} 0 0 1 -${s},${s} h-${p} a${s},${s} 0 0 1 -${s},-${s} v-${v} a${s},${s} 0 0 1 ${s},-${s} z`}function ge(){const t=d("__overlaySvg");t&&t.remove()}function we(){const t=document.getElementById("driver-dummy-element");if(t)return t;let e=document.createElement("div");return e.id="driver-dummy-element",e.style.width="0",e.style.height="0",e.style.pointerEvents="none",e.style.opacity="0",e.style.position="fixed",e.style.top="50%",e.style.left="50%",document.body.appendChild(e),e}function G(t){const{element:e}=t;let o=typeof e=="string"?document.querySelector(e):e;o||(o=we()),ye(o,t)}function fe(){const t=d("__activeElement"),e=d("__activeStep");t&&(Y(t),ve(),re(t,e))}function ye(t,e){const o=Date.now(),r=d("__activeStep"),n=d("__activeElement")||t,a=!n||n===t,u=t.id==="driver-dummy-element",c=n.id==="driver-dummy-element",s=l("animate"),m=e.onHighlightStarted||l("onHighlightStarted"),i=e?.onHighlighted||l("onHighlighted"),p=r?.onDeselected||l("onDeselected"),v=l(),g=d();!a&&p&&p(c?void 0:n,r,{config:v,state:g}),m&&m(u?void 0:t,e,{config:v,state:g});const y=!a&&s;let w=!1;Ce(),S("previousStep",r),S("previousElement",n),S("activeStep",e),S("activeElement",t);const h=()=>{if(d("__transitionCallback")!==h)return;const b=Date.now()-o,E=400-b<=400/2;e.popover&&E&&!w&&y&&(K(t,e),w=!0),l("animate")&&b<400?pe(b,400,n,t):(Y(t),i&&i(u?void 0:t,e,{config:l(),state:d()}),S("__transitionCallback",void 0),S("__previousStep",r),S("__previousElement",n),S("__activeStep",e),S("__activeElement",t)),window.requestAnimationFrame(h)};S("__transitionCallback",h),window.requestAnimationFrame(h),X(t),!y&&e.popover&&K(t,e),n.classList.remove("driver-active-element","driver-no-interaction"),n.removeAttribute("aria-haspopup"),n.removeAttribute("aria-expanded"),n.removeAttribute("aria-controls"),l("disableActiveInteraction")&&t.classList.add("driver-no-interaction"),t.classList.add("driver-active-element"),t.setAttribute("aria-haspopup","dialog"),t.setAttribute("aria-expanded","true"),t.setAttribute("aria-controls","driver-popover-content")}function be(){var t;(t=document.getElementById("driver-dummy-element"))==null||t.remove(),document.querySelectorAll(".driver-active-element").forEach(e=>{e.classList.remove("driver-active-element","driver-no-interaction"),e.removeAttribute("aria-haspopup"),e.removeAttribute("aria-expanded"),e.removeAttribute("aria-controls")})}function _(){const t=d("__resizeTimeout");t&&window.cancelAnimationFrame(t),S("__resizeTimeout",window.requestAnimationFrame(fe))}function xe(t){var e;if(!d("isInitialized")||!(t.key==="Tab"||t.keyCode===9))return;const o=d("__activeElement"),r=(e=d("popover"))==null?void 0:e.wrapper,n=J([...r?[r]:[],...o?[o]:[]]),a=n[0],u=n[n.length-1];if(t.preventDefault(),t.shiftKey){const c=n[n.indexOf(document.activeElement)-1]||u;c?.focus()}else{const c=n[n.indexOf(document.activeElement)+1]||a;c?.focus()}}function te(t){(l("allowKeyboardControl")??!0)&&(t.key==="Escape"?A("escapePress"):t.key==="ArrowRight"?A("arrowRightPress"):t.key==="ArrowLeft"&&A("arrowLeftPress"))}function oe(t,e,o){const r=(n,a)=>{const u=n.target;t.contains(u)&&((!o||o(u))&&(n.preventDefault(),n.stopPropagation(),n.stopImmediatePropagation()),a?.(n))};document.addEventListener("pointerdown",r,!0),document.addEventListener("mousedown",r,!0),document.addEventListener("pointerup",r,!0),document.addEventListener("mouseup",r,!0),document.addEventListener("click",n=>{r(n,e)},!0)}function Se(){window.addEventListener("keyup",te,!1),window.addEventListener("keydown",xe,!1),window.addEventListener("resize",_),window.addEventListener("scroll",_)}function ke(){window.removeEventListener("keyup",te),window.removeEventListener("resize",_),window.removeEventListener("scroll",_)}function Ce(){const t=d("popover");t&&(t.wrapper.style.display="none")}function K(t,e){var o,r;let n=d("popover");n&&document.body.removeChild(n.wrapper),n=Ee(),document.body.appendChild(n.wrapper);const{title:a,description:u,showButtons:c,disableButtons:s,showProgress:m,nextBtnText:i=l("nextBtnText")||"Next &rarr;",prevBtnText:p=l("prevBtnText")||"&larr; Previous",progressText:v=l("progressText")||"{current} of {total}"}=e.popover||{};n.nextButton.innerHTML=i,n.previousButton.innerHTML=p,n.progress.innerHTML=v,a?(n.title.innerText=a,n.title.style.display="block"):n.title.style.display="none",u?(n.description.innerHTML=u,n.description.style.display="block"):n.description.style.display="none";const g=c||l("showButtons"),y=m||l("showProgress")||!1,w=g?.includes("next")||g?.includes("previous")||y;n.closeButton.style.display=g.includes("close")?"block":"none",w?(n.footer.style.display="flex",n.progress.style.display=y?"block":"none",n.nextButton.style.display=g.includes("next")?"block":"none",n.previousButton.style.display=g.includes("previous")?"block":"none"):n.footer.style.display="none";const h=s||l("disableButtons")||[];h!=null&&h.includes("next")&&(n.nextButton.disabled=!0,n.nextButton.classList.add("driver-popover-btn-disabled")),h!=null&&h.includes("previous")&&(n.previousButton.disabled=!0,n.previousButton.classList.add("driver-popover-btn-disabled")),h!=null&&h.includes("close")&&(n.closeButton.disabled=!0,n.closeButton.classList.add("driver-popover-btn-disabled"));const b=n.wrapper;b.style.display="block",b.style.left="",b.style.top="",b.style.bottom="",b.style.right="",b.id="driver-popover-content",b.setAttribute("role","dialog"),b.setAttribute("aria-labelledby","driver-popover-title"),b.setAttribute("aria-describedby","driver-popover-description");const E=n.arrow;E.className="driver-popover-arrow";const M=((o=e.popover)==null?void 0:o.popoverClass)||l("popoverClass")||"";b.className=`driver-popover ${M}`.trim(),oe(n.wrapper,P=>{var D,B,$;const T=P.target,I=((D=e.popover)==null?void 0:D.onNextClick)||l("onNextClick"),H=((B=e.popover)==null?void 0:B.onPrevClick)||l("onPrevClick"),N=(($=e.popover)==null?void 0:$.onCloseClick)||l("onCloseClick");if(T.classList.contains("driver-popover-next-btn"))return I?I(t,e,{config:l(),state:d()}):A("nextClick");if(T.classList.contains("driver-popover-prev-btn"))return H?H(t,e,{config:l(),state:d()}):A("prevClick");if(T.classList.contains("driver-popover-close-btn"))return N?N(t,e,{config:l(),state:d()}):A("closeClick")},P=>!(n!=null&&n.description.contains(P))&&!(n!=null&&n.title.contains(P))&&P.className.includes("driver-popover")),S("popover",n);const x=((r=e.popover)==null?void 0:r.onPopoverRender)||l("onPopoverRender");x&&x(n,{config:l(),state:d()}),re(t,e),X(b);const k=t.classList.contains("driver-dummy-element"),C=J([b,...k?[]:[t]]);C.length>0&&C[0].focus()}function ne(){const t=d("popover");if(!(t!=null&&t.wrapper))return;const e=t.wrapper.getBoundingClientRect(),o=l("stagePadding")||0,r=l("popoverOffset")||0;return{width:e.width+o+r,height:e.height+o+r,realWidth:e.width,realHeight:e.height}}function Q(t,e){const{elementDimensions:o,popoverDimensions:r,popoverPadding:n,popoverArrowDimensions:a}=e;return t==="start"?Math.max(Math.min(o.top-n,window.innerHeight-r.realHeight-a.width),a.width):t==="end"?Math.max(Math.min(o.top-r?.realHeight+o.height+n,window.innerHeight-r?.realHeight-a.width),a.width):t==="center"?Math.max(Math.min(o.top+o.height/2-r?.realHeight/2,window.innerHeight-r?.realHeight-a.width),a.width):0}function V(t,e){const{elementDimensions:o,popoverDimensions:r,popoverPadding:n,popoverArrowDimensions:a}=e;return t==="start"?Math.max(Math.min(o.left-n,window.innerWidth-r.realWidth-a.width),a.width):t==="end"?Math.max(Math.min(o.left-r?.realWidth+o.width+n,window.innerWidth-r?.realWidth-a.width),a.width):t==="center"?Math.max(Math.min(o.left+o.width/2-r?.realWidth/2,window.innerWidth-r?.realWidth-a.width),a.width):0}function re(t,e){const o=d("popover");if(!o)return;const{align:r="start",side:n="left"}=e?.popover||{},a=r,u=t.id==="driver-dummy-element"?"over":n,c=l("stagePadding")||0,s=ne(),m=o.arrow.getBoundingClientRect(),i=t.getBoundingClientRect(),p=i.top-s.height;let v=p>=0;const g=window.innerHeight-(i.bottom+s.height);let y=g>=0;const w=i.left-s.width;let h=w>=0;const b=window.innerWidth-(i.right+s.width);let E=b>=0;const M=!v&&!y&&!h&&!E;let x=u;if(u==="top"&&v?E=h=y=!1:u==="bottom"&&y?E=h=v=!1:u==="left"&&h?E=v=y=!1:u==="right"&&E&&(h=v=y=!1),u==="over"){const k=window.innerWidth/2-s.realWidth/2,C=window.innerHeight/2-s.realHeight/2;o.wrapper.style.left=`${k}px`,o.wrapper.style.right="auto",o.wrapper.style.top=`${C}px`,o.wrapper.style.bottom="auto"}else if(M){const k=window.innerWidth/2-s?.realWidth/2,C=10;o.wrapper.style.left=`${k}px`,o.wrapper.style.right="auto",o.wrapper.style.bottom=`${C}px`,o.wrapper.style.top="auto"}else if(h){const k=Math.min(w,window.innerWidth-s?.realWidth-m.width),C=Q(a,{elementDimensions:i,popoverDimensions:s,popoverPadding:c,popoverArrowDimensions:m});o.wrapper.style.left=`${k}px`,o.wrapper.style.top=`${C}px`,o.wrapper.style.bottom="auto",o.wrapper.style.right="auto",x="left"}else if(E){const k=Math.min(b,window.innerWidth-s?.realWidth-m.width),C=Q(a,{elementDimensions:i,popoverDimensions:s,popoverPadding:c,popoverArrowDimensions:m});o.wrapper.style.right=`${k}px`,o.wrapper.style.top=`${C}px`,o.wrapper.style.bottom="auto",o.wrapper.style.left="auto",x="right"}else if(v){const k=Math.min(p,window.innerHeight-s.realHeight-m.width);let C=V(a,{elementDimensions:i,popoverDimensions:s,popoverPadding:c,popoverArrowDimensions:m});o.wrapper.style.top=`${k}px`,o.wrapper.style.left=`${C}px`,o.wrapper.style.bottom="auto",o.wrapper.style.right="auto",x="top"}else if(y){const k=Math.min(g,window.innerHeight-s?.realHeight-m.width);let C=V(a,{elementDimensions:i,popoverDimensions:s,popoverPadding:c,popoverArrowDimensions:m});o.wrapper.style.left=`${C}px`,o.wrapper.style.bottom=`${k}px`,o.wrapper.style.top="auto",o.wrapper.style.right="auto",x="bottom"}M?o.arrow.classList.add("driver-popover-arrow-none"):Le(a,x,t)}function Le(t,e,o){const r=d("popover");if(!r)return;const n=o.getBoundingClientRect(),a=ne(),u=r.arrow,c=a.width,s=window.innerWidth,m=n.width,i=n.left,p=a.height,v=window.innerHeight,g=n.top,y=n.height;u.className="driver-popover-arrow";let w=e,h=t;e==="top"?(i+m<=0?(w="right",h="end"):i+m-c<=0&&(w="top",h="start"),i>=s?(w="left",h="end"):i+c>=s&&(w="top",h="end")):e==="bottom"?(i+m<=0?(w="right",h="start"):i+m-c<=0&&(w="bottom",h="start"),i>=s?(w="left",h="start"):i+c>=s&&(w="bottom",h="end")):e==="left"?(g+y<=0?(w="bottom",h="end"):g+y-p<=0&&(w="left",h="start"),g>=v?(w="top",h="end"):g+p>=v&&(w="left",h="end")):e==="right"&&(g+y<=0?(w="bottom",h="start"):g+y-p<=0&&(w="right",h="start"),g>=v?(w="top",h="start"):g+p>=v&&(w="right",h="end")),w?(u.classList.add(`driver-popover-arrow-side-${w}`),u.classList.add(`driver-popover-arrow-align-${h}`)):u.classList.add("driver-popover-arrow-none")}function Ee(){const t=document.createElement("div");t.classList.add("driver-popover");const e=document.createElement("div");e.classList.add("driver-popover-arrow");const o=document.createElement("header");o.id="driver-popover-title",o.classList.add("driver-popover-title"),o.style.display="none",o.innerText="Popover Title";const r=document.createElement("div");r.id="driver-popover-description",r.classList.add("driver-popover-description"),r.style.display="none",r.innerText="Popover description is here";const n=document.createElement("button");n.type="button",n.classList.add("driver-popover-close-btn"),n.setAttribute("aria-label","Close"),n.innerHTML="&times;";const a=document.createElement("footer");a.classList.add("driver-popover-footer");const u=document.createElement("span");u.classList.add("driver-popover-progress-text"),u.innerText="";const c=document.createElement("span");c.classList.add("driver-popover-navigation-btns");const s=document.createElement("button");s.type="button",s.classList.add("driver-popover-prev-btn"),s.innerHTML="&larr; Previous";const m=document.createElement("button");return m.type="button",m.classList.add("driver-popover-next-btn"),m.innerHTML="Next &rarr;",c.appendChild(s),c.appendChild(m),a.appendChild(u),a.appendChild(c),t.appendChild(n),t.appendChild(e),t.appendChild(o),t.appendChild(r),t.appendChild(a),{wrapper:t,arrow:e,title:o,description:r,footer:a,previousButton:s,nextButton:m,closeButton:n,footerButtons:c,progress:u}}function Me(){var t;const e=d("popover");e&&((t=e.wrapper.parentElement)==null||t.removeChild(e.wrapper))}function Pe(t={}){q(t);function e(){l("allowClose")&&m()}function o(){const i=d("activeIndex"),p=l("steps")||[];if(typeof i>"u")return;const v=i+1;p[v]?s(v):m()}function r(){const i=d("activeIndex"),p=l("steps")||[];if(typeof i>"u")return;const v=i-1;p[v]?s(v):m()}function n(i){(l("steps")||[])[i]?s(i):m()}function a(){var i;if(d("__transitionCallback"))return;const p=d("activeIndex"),v=d("__activeStep"),g=d("__activeElement");if(typeof p>"u"||typeof v>"u"||typeof d("activeIndex")>"u")return;const y=((i=v.popover)==null?void 0:i.onPrevClick)||l("onPrevClick");if(y)return y(g,v,{config:l(),state:d()});r()}function u(){var i;if(d("__transitionCallback"))return;const p=d("activeIndex"),v=d("__activeStep"),g=d("__activeElement");if(typeof p>"u"||typeof v>"u")return;const y=((i=v.popover)==null?void 0:i.onNextClick)||l("onNextClick");if(y)return y(g,v,{config:l(),state:d()});o()}function c(){d("isInitialized")||(S("isInitialized",!0),document.body.classList.add("driver-active",l("animate")?"driver-fade":"driver-simple"),Se(),F("overlayClick",e),F("escapePress",e),F("arrowLeftPress",a),F("arrowRightPress",u))}function s(i=0){var p,v,g,y,w,h,b,E;const M=l("steps");if(!M){console.error("No steps to drive through"),m();return}if(!M[i]){m();return}S("__activeOnDestroyed",document.activeElement),S("activeIndex",i);const x=M[i],k=M[i+1],C=M[i-1],P=((p=x.popover)==null?void 0:p.doneBtnText)||l("doneBtnText")||"Done",D=l("allowClose"),B=typeof((v=x.popover)==null?void 0:v.showProgress)<"u"?(g=x.popover)==null?void 0:g.showProgress:l("showProgress"),$=(((y=x.popover)==null?void 0:y.progressText)||l("progressText")||"{{current}} of {{total}}").replace("{{current}}",`${i+1}`).replace("{{total}}",`${M.length}`),T=((w=x.popover)==null?void 0:w.showButtons)||l("showButtons"),I=["next","previous",...D?["close"]:[]].filter(se=>!(T!=null&&T.length)||T.includes(se)),H=((h=x.popover)==null?void 0:h.onNextClick)||l("onNextClick"),N=((b=x.popover)==null?void 0:b.onPrevClick)||l("onPrevClick"),ie=((E=x.popover)==null?void 0:E.onCloseClick)||l("onCloseClick");G({...x,popover:{showButtons:I,nextBtnText:k?void 0:P,disableButtons:[...C?[]:["previous"]],showProgress:B,progressText:$,onNextClick:H||(()=>{k?s(i+1):m()}),onPrevClick:N||(()=>{s(i-1)}),onCloseClick:ie||(()=>{m()}),...x?.popover||{}}})}function m(i=!0){const p=d("__activeElement"),v=d("__activeStep"),g=d("__activeOnDestroyed"),y=l("onDestroyStarted");if(i&&y){const b=!p||p?.id==="driver-dummy-element";y(b?void 0:p,v,{config:l(),state:d()});return}const w=v?.onDeselected||l("onDeselected"),h=l("onDestroyed");if(document.body.classList.remove("driver-active","driver-fade","driver-simple"),ke(),Me(),be(),ge(),ue(),z(),p&&v){const b=p.id==="driver-dummy-element";w&&w(b?void 0:p,v,{config:l(),state:d()}),h&&h(b?void 0:p,v,{config:l(),state:d()})}g&&g.focus()}return{isActive:()=>d("isInitialized")||!1,refresh:_,drive:(i=0)=>{c(),s(i)},setConfig:q,setSteps:i=>{z(),q({...l(),steps:i})},getConfig:l,getState:d,getActiveIndex:()=>d("activeIndex"),isFirstStep:()=>d("activeIndex")===0,isLastStep:()=>{const i=l("steps")||[],p=d("activeIndex");return p!==void 0&&p===i.length-1},getActiveStep:()=>d("activeStep"),getActiveElement:()=>d("activeElement"),getPreviousElement:()=>d("previousElement"),getPreviousStep:()=>d("previousStep"),moveNext:o,movePrevious:r,moveTo:n,hasNextStep:()=>{const i=l("steps")||[],p=d("activeIndex");return p!==void 0&&i[p+1]},hasPreviousStep:()=>{const i=l("steps")||[],p=d("activeIndex");return p!==void 0&&i[p-1]},highlight:i=>{c(),G({...i,popover:i.popover?{showButtons:[],showProgress:!1,progressText:"",...i.popover}:void 0})},destroy:()=>{m(!1)}}}function j(){const t=Pe({showProgress:!0,showButtons:["next","previous"],steps:[{popover:{title:"Welcome to TASKMIXR",description:"Want to split task/items randomly? <br> This is the right app for you.",align:"center"}},{element:"#users",popover:{title:"Let's begin...",description:"First, enter all the names that are going to do a task."}},{element:"#chores",popover:{title:"Fill all your tasks",description:"Write down all tasks you have to do."}},{element:".mainBtn",popover:{title:"Random Button",description:"Push it to get random results."}},{element:".results__container",popover:{title:"Results",description:"The random results will be displayed here."}},{element:".saveBtn",popover:{title:"Save Button",description:"If you are happy with the results, push here to save it locally."}},{element:"#results__title",popover:{title:"Custom Title",description:"Optionally, you can store your results with a custom title."}},{element:".sr__card",popover:{title:"Saved Results",description:"Here will be displayed all the results that are stored."}},{popover:{title:"Thanks for your time!",description:"And one more thing, have fun."}}]});t.refresh(),t.drive()}function He(){const t=f.loadFromLocalStorage(L);if(t===null){e(),f.getDarkModeUserPreference({save:!0});return}if(!t.darkMode&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches){e(),f.getDarkModeUserPreference({save:!0});return}if(t.darkMode.userDarkMode){e();return}o();return;function e(){const r=document.getElementById("darkModeSwitch"),n=r.nextElementSibling;document.documentElement.dataset.mode="dark",r.checked=!0,n.innerHTML=`
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path d="M12 11.807A9.002 9.002 0 0 1 10.049 2a9.942 9.942 0 0 0-5.12 2.735c-3.905 3.905-3.905 10.237 0 14.142 3.906 3.906 10.237 3.905 14.143 0a9.946 9.946 0 0 0 2.735-5.119A9.003 9.003 0 0 1 12 11.807z"></path></svg>
          `}function o(){const r=document.getElementById("darkModeSwitch");document.documentElement.dataset.mode="light",r.checked=!1}}function Ne(){const t=f.loadFromLocalStorage(L);if(t===null){o(),f.getThemeUserPreference({save:!0});return}if(!t.theme){o(),f.getThemeUserPreference({save:!0});return}e(t.theme);return;function e(r){document.documentElement.dataset.themeGeneral=r}function o(){document.documentElement.dataset.themeGeneral="purple"}}function We(){const t=f.loadFromLocalStorage(L);if(t.lang){t.lang!==document.documentElement.lang&&(window.location.href=t.lang);return}if(t===null){e(),f.getLangUserPreference({save:!0});return}if(!t.lang){e(),f.getLangUserPreference({save:!0});return}return;function e(){document.documentElement.lang="en"}}function Fe(){const t=f.loadFromLocalStorage(L);if(t===null){j(),f.getTourUserPreference({save:!0});return}if(!t.tour){j(),f.getTourUserPreference({save:!0});return}}function Re(){let t=document.documentElement,e=!1;const o=setTimeout(()=>{t.style.setProperty("--transisiton-time","300ms"),e=!0},750);e&&clearTimeout(o)}class Te{constructor(e){this.themeButtons=document.getElementById(e)?.querySelectorAll("button"),this.handleThemeSwitch()}handleThemeSwitch(){if(this.themeButtons)for(let e=0;e<this.themeButtons.length;e++){const o=this.themeButtons[e],r=o.dataset.theme;o.addEventListener("click",n=>{document.documentElement.dataset.themeGeneral=r,f.getThemeUserPreference({save:!0})})}}}class Ae{constructor(e){this.darkModeCheckbox=document.getElementById(e),this.handleDarkModeSwitch()}handleDarkModeSwitch(){this.darkModeCheckbox?.addEventListener("change",e=>{e.currentTarget.checked?(document.documentElement.dataset.mode="dark",this.darkModeCheckbox.nextElementSibling.innerHTML=`
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M12 11.807A9.002 9.002 0 0 1 10.049 2a9.942 9.942 0 0 0-5.12 2.735c-3.905 3.905-3.905 10.237 0 14.142 3.906 3.906 10.237 3.905 14.143 0a9.946 9.946 0 0 0 2.735-5.119A9.003 9.003 0 0 1 12 11.807z"></path>
          </svg>
        `):(document.documentElement.dataset.mode="light",this.darkModeCheckbox.nextElementSibling.innerHTML=`
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M20.742 13.045a8.088 8.088 0 0 1-2.077.271c-2.135 0-4.14-.83-5.646-2.336a8.025 8.025 0 0 1-2.064-7.723A1 1 0 0 0 9.73 2.034a10.014 10.014 0 0 0-4.489 2.582c-3.898 3.898-3.898 10.243 0 14.143a9.937 9.937 0 0 0 7.072 2.93 9.93 9.93 0 0 0 7.07-2.929 10.007 10.007 0 0 0 2.583-4.491 1.001 1.001 0 0 0-1.224-1.224zm-2.772 4.301a7.947 7.947 0 0 1-5.656 2.343 7.953 7.953 0 0 1-5.658-2.344c-3.118-3.119-3.118-8.195 0-11.314a7.923 7.923 0 0 1 2.06-1.483 10.027 10.027 0 0 0 2.89 7.848 9.972 9.972 0 0 0 7.848 2.891 8.036 8.036 0 0 1-1.484 2.059z"></path>
          </svg>
        `),f.getDarkModeUserPreference({save:!0})})}}class _e{constructor(){this.submenuItems=document.querySelectorAll("[data-submenu]"),this.title=document.querySelector(".header__title"),this.init()}init(){this.submenuItems.forEach(e=>{const o=e.querySelector("nav"),r=e.querySelector('input[type="checkbox"]');r.addEventListener("change",()=>{this.toggleSubMenu(o,r)})}),document.addEventListener("click",e=>this.handleOutsideClick(e))}toggleSubMenu(e,o){const r=o.checked;console.log(e,r),this.submenuItems.forEach(a=>{const u=a.querySelector('input[type="checkbox"]'),c=a.querySelector("nav");e!==c&&u.checked&&(u.checked=!1,c.setAttribute("aria-expanded","false"))}),e.setAttribute("aria-expanded",r.toString());const n=window.matchMedia("(max-width: 569px)");console.log(n),n.matches&&r?this.title.setAttribute("data-showMenuMobile",""):this.title.removeAttribute("data-showMenuMobile")}handleOutsideClick(e){!e.target.closest("[data-submenu]")&&this.closeAllSubmenus()}closeAllSubmenus(){this.submenuItems.forEach(e=>{const o=e.querySelector('input[type="checkbox"]'),r=e.querySelector("nav");o.checked=!1,r.setAttribute("aria-expanded","false")}),this.title.removeAttribute("data-showMenuMobile")}}window.addEventListener("load",async t=>{new Ae("darkModeSwitch"),new Te("themeSwitch_list"),new _e;const e=document.querySelectorAll("button.lang");for(let o=0;o<e.length;o++)e[o].addEventListener("click",async n=>{const c=n.target.parentNode.attributes[0].value;switch(c){case"/":document.documentElement.lang="en";break;case"/es":document.documentElement.lang="es";break;case"/fr":document.documentElement.lang="fr";break}async function s(){await f.getLangUserPreference({save:!0}),window.location.href=c.slice(0)}s()})});window.addEventListener("load",t=>{De()});function De(){const t=window.matchMedia("(min-width: 750px)");t.matches&&document.querySelector(".footer__bounds")?.setAttribute("data-shadow_card",""),t.addEventListener("change",()=>{e(t)});return;function e(o){o.matches?document.querySelector(".footer__bounds")?.setAttribute("data-shadow_card",""):document.querySelector(".footer__bounds")?.removeAttribute("data-shadow_card")}}export{f as H,Ne as a,We as b,Fe as c,Re as d,$e as e,L as l,Ie as r,Be as u,He as w};
