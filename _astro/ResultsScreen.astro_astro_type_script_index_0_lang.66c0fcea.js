import{H as a,l as u,u as d,r as h,e as m}from"./Footer.astro_astro_type_script_index_0_lang.0b76bded.js";class E{constructor({storeArray:e,section:t,id:s,displayName:r}){this.storeArray=e,this.inputSection=t,this.inputId=s||this.setNewId(),this.displayName=r?`${r} ${this.storeArray.length+1}`:`${a.capitalizeFirstLetter(a.removeLastLetter(this.inputSection.id))} ${this.storeArray.length+1}`,this.inputElement=this.createInputElement(),this.handleInputChange(),this.appendToDom()}setNewId(){return`input_${a.removeLastLetter(this.inputSection.id)}_${this.storeArray.length+1}`}createInputElement(){const e=document.createElement("input");return e.id=this.setNewId(),e.type="text",e.placeholder=this.displayName,e}appendToDom(){this.inputSection.querySelector('[class*="inputs"]')?.appendChild(this.inputElement)}removeFromDom(){this.inputElement.remove()}handleInputChange(){this.inputElement.addEventListener("input",e=>{this.displayName=this.inputElement.value})}updateDisplayName(e){this.displayName=e,this.inputElement.value=this.displayName}}class S{constructor(e,t,s){this.storeArray=e,this.parentSectionElement=document.getElementById(t),this.elementClass=s,this.localStorageData=null,this.init(2),this.addBtn=a.handleAddBtnClick(this.parentSectionElement,".addBtn",this.addNewInputElement.bind(this)),this.removeBtn=this.createRemoveButton(),this.eventRemoveButton()}async init(e){this.resetDummy(),this.localStorageData=await a.loadFromLocalStorage(u),await this.getLocalStorageResults(e)}resetDummy(){this.parentSectionElement.querySelector('[class*="__inputs"]').innerHTML=""}async getLocalStorageResults(e){const t=this.localStorageData===null,s=t?!0:!this.localStorageData.history,r=s?!0:this.localStorageData.history?.length===0;if(t)for(let n=0;n<e;n++)await this.createElementAndStoreToArray();else{if(!s){if(!r)await this.createElementBasedInSavedResults();else for(let n=0;n<e;n++)await this.createElementAndStoreToArray();return}if(s){for(let n=0;n<e;n++)await this.createElementAndStoreToArray();return}}}async createElementAndStoreToArray(){this.storeArray.push(await new this.elementClass(this.storeArray,this.parentSectionElement))}async createElementBasedInSavedResults(){const e=this.parentSectionElement.id,t=this.localStorageData.history.length-1,r=this.localStorageData.history[t][e];for(const n in r)if(Object.hasOwnProperty.call(r,n)){const l=r[n],i=await new this.elementClass(this.storeArray,this.parentSectionElement);i.updateDisplayName(`${l}`),this.storeArray.push(i)}}async addNewInputElement(e){await this.storeToArray(),this.storeArray.length>1&&this.appendRemoveBtn()}createRemoveButton(){const e=document.createElement("button");return e.className="addBtn",e.textContent="-",e}eventRemoveButton(){this.removeBtn.addEventListener("click",e=>{this.storeArray.pop()?.removeFromDom(),this.storeArray.length<=1&&this.removeBtn.remove()})}appendRemoveBtn(){this.parentSectionElement.querySelector('[class*="__btn"]')?.appendChild(this.removeBtn)}async storeToArray(){return this.storeArray.push(new this.elementClass(this.storeArray,this.parentSectionElement))}}class y{constructor(e,t,s){this.chore=e,this.user=t,this.choreId=s,this.resultsSection=document.getElementById("results")?.querySelector("ul"),this.resultElement=this.createResult(),this.displayResult()}createResult(){const e=document.createElement("li"),t=document.createElement("div"),s=document.createElement("span");s.className=`chore_${this.choreId}`,s.textContent=this.chore;const r=document.createElement("span");return r.textContent=this.user,r.className=`user_${this.choreId}`,t.appendChild(s),t.appendChild(r),e.appendChild(t),e}displayResult(){this.resultsSection.appendChild(this.resultElement)}removeResult(){this.resultElement.remove()}updateChore(e){this.chore=e;const t=this.resultElement.querySelector(`.chore_${this.choreId}`);t?.textContent!=null&&(t.textContent=this.chore)}updateUser(e){this.user=e;const t=this.resultElement.querySelector(`.user_${this.choreId}`);return t?.textContent!=null&&(t.textContent=this.user),this.user}}class k extends S{constructor(e,t,s,r){super(e,t,s),this.resultsArray=r}async getLocalStorageResults(e){const t=this.localStorageData===null,s=t?!0:!this.localStorageData.history,r=s?!0:this.localStorageData.history?.length===0;if(t)for(let n=0;n<e;n++)await this.createElementAndStoreToArray(),await this.createResultAndStoreToArray(n),this.setElementEventToInputChange();else{if(!s){if(r)for(let n=0;n<e;n++)await this.createElementAndStoreToArray(),await this.createResultAndStoreToArray(n),this.setElementEventToInputChange();else{await this.createElementBasedInSavedResults();for(let n=0;n<this.storeArray.length;n++)await this.createResultAndStoreToArray(n),await this.setElementEventToInputChange(this.storeArray[n])}return}if(s){for(let n=0;n<e;n++)await this.createElementAndStoreToArray(),await this.createResultAndStoreToArray(n),this.setElementEventToInputChange();return}}}async createResultAndStoreToArray(e){this.resultsArray.push(new y(this.storeArray[e].displayName,"???",this.storeArray[e].inputId))}async addNewInputElement(e){await this.storeToArray(),this.createNewResult(this.storeArray[this.storeArray.length-1].displayName,"???",this.storeArray[this.storeArray.length-1].inputId),this.setElementEventToInputChange(),this.appendRemoveBtn()}createNewResult(e,t="???",s){this.resultsArray.push(new y(e,t,s))}async setElementEventToInputChange(e){const t=e||this.storeArray[this.storeArray.length-1],s=this.resultsArray[this.resultsArray.length-1];t.inputElement.addEventListener("input",r=>{s.updateChore(t.inputElement.value)})}eventRemoveButton(){this.removeBtn.addEventListener("click",e=>{let t=this.storeArray.pop(),s=this.resultsArray.pop();t?.removeFromDom(),s?.removeResult(),this.storeArray.length<=1&&this.removeBtn.remove()})}}class C extends S{constructor(e,t,s){super(e,t,s)}}class v{constructor(e){this.btnElement=document.getElementById(e),this.btnEvents()}btnEvents(){this.btnElement?.addEventListener("click",this.handleBtnClick.bind(this))}async handleBtnClick(e){try{return e}catch(t){return t}}disableButton(){this.btnElement?.setAttribute("disabled","true")}}class B extends v{constructor(e){super(e)}async handleBtnClick(e){try{let t=Array.from(d);for(let r=0;r<h.length;r++){let n=Math.floor(Math.random()*t.length),c=t[n].displayName;h[r].updateUser(c);let l=t.splice(n,1)[0];t=t.filter(i=>i.inputId!==l.inputId),t.length===0&&(t=d.map(i=>i))}return document.getElementById("saveBtn")?.removeAttribute("disabled"),e}catch{}}}class I extends v{constructor(e){super(e)}resultToStore(){const e={};for(let t=0;t<h.length;t++)Object.assign(e,{[h[t].choreId]:{chore:h[t].chore,user:h[t].user,checked:!1,id:`${a.getTodayDate(!0)}_${h[t].choreId}`}});return e}usersToStore(){const e={};for(let t=0;t<d.length;t++)Object.assign(e,{[d[t].inputId]:d[t].displayName});return e}choresToStore(){const e={};for(let t=0;t<m.length;t++)Object.assign(e,{[m[t].inputId]:m[t].displayName});return e}async handleBtnClick(e){try{const t=a.loadFromLocalStorage(u);let s=[];if(Object.is(t,null))throw new Error("No local storage");t.history&&(s=t.history);let r={lang:await a.getLangUserPreference({save:!1}),tour:a.getTourUserPreference({save:!1}),darkMode:a.getDarkModeUserPreference({save:!1}),theme:a.getThemeUserPreference({save:!1}),history:[...s,this.resultToStorage()]};return a.saveToLocalStorage(u,r),this.disableButton(),e}catch{}}resultToStorage(){const e=this.usersToStore(),t=this.choresToStore(),s=this.resultToStore();return{id:a.getTodayDate(!0),title:this.getCustomTitleValue(),date:a.getTodayDate(!1),users:{...e},chores:{...t},results:{...s}}}getCustomTitleValue(){const e=document.getElementById("results__title");return e.value?e.value:null}}function A(o){switch(document.documentElement.lang){case"en":if(o==="task")return"Task";if(o==="user")return"User";break;case"es":if(o==="task")return"Tarea";if(o==="user")return"Usuario";break;case"fr":if(o==="task")return"Tâche";if(o==="user")return"Usager";break}}class b extends E{constructor(e,t){super({storeArray:e,section:t,displayName:A("task")})}}class w extends E{constructor(e,t){super({storeArray:e,section:t,displayName:A("user")})}}window.addEventListener("load",async o=>{document.getElementById("results").querySelector("ul").innerHTML="",new C(d,"users",w),new k(m,"chores",b,h),new I("saveBtn"),new B("mainBtn")});class f{constructor(e,t,s,r,n,c,l){this.accordionSection=e,this.accordionId=s,this.customtitle=t,this.results=l,this.chores=n,this.users=c,this.date=r,this.titleBtn,this.accordionElement=this.createAccordionElement(),this.appendToDom(),this.handleAccordionClick()}handleAccordionClick(){this.titleBtn.addEventListener("click",e);function e(){const t=this.getAttribute("aria-expanded");console.log();const s=this.parentNode.querySelectorAll("button");for(let r=0;r<s.length;r++)s[r].setAttribute("aria-expanded","false");t=="false"&&this.setAttribute("aria-expanded","true")}}createAccordionElement(){const e=document.createElement("div");e.className="accordion-item",e.id=this.accordionId;const t=this.createCheckItem(),s=this.createAccordionTitle(this.date,this.customtitle),r=this.createAccordionContent(this.createResultsItem());return e.appendChild(t),e.appendChild(s),e.appendChild(r),this.createResultsItem(),this.titleBtn=s,e}createCheckItem(){const e=document.createElement("div");e.id=`${this.accordionId}__checkcontainer`,e.className="accordion__check",e.setAttribute("data-showCheckMode","false");const t=document.createElement("input");t.type="checkbox",t.name=`${this.accordionId}__checkbox`,t.id=`${this.accordionId}__checkbox`;const s=document.createElement("label");return s.htmlFor=`${this.accordionId}__checkbox`,s.innerHTML=`
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM5 19V5h14l.002 14H5z"></path></svg>

      `,t.addEventListener("change",this.checkMode.bind(this)),e.appendChild(t),e.appendChild(s),e}checkMode(e){const t=e.target.nextElementSibling;e.target.id,e.target.checked?t.children[0].innerHTML='<path d="m10.933 13.519-2.226-2.226-1.414 1.414 3.774 3.774 5.702-6.84-1.538-1.282z"></path><path d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM5 19V5h14l.002 14H5z"></path>':t.children[0].innerHTML=`
        <path d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM5 19V5h14l.002 14H5z"></path>`}createAccordionTitle(e,t){const s=document.createElement("button");s.setAttribute("aria-expanded","false"),s.id=`${this.accordionId}__btn`;const r=document.createElement("span");r.className="accordion-title",r.textContent=e;const n=document.createElement("span");return n.className="accordion-title",n.textContent=t,s.appendChild(r),s.appendChild(n),s}createAccordionContent(e){const t=document.createElement("div");t.className="accordion-content";const s=document.createElement("div");return s.id=`${this.accordionId}__content`,s.appendChild(e),t.appendChild(s),t}createResultsItem(){const e=new DocumentFragment;for(const t in this.results)if(Object.hasOwnProperty.call(this.results,t)){const s=this.results[t].chore,r=this.results[t].user,n=this.results[t].id,c=this.results[t].checked,l=document.createElement("hr"),i=document.createElement("div");i.className="accordion-result",c&&i.setAttribute("data-checked_item","true");const p=document.createElement("span");p.textContent=`${s}`;const g=document.createElement("span");g.textContent=r,i.id=n,i.appendChild(p),i.appendChild(l),i.appendChild(g),i.addEventListener("click",this.checkedResultElement.bind(this)),e.appendChild(i)}return e}checkedResultElement(e){let t=e.currentTarget.getAttribute("data-checked_item");t==="true"&&(e.currentTarget.removeAttribute("data-checked_item"),a.changeValueFromId(e.currentTarget.id,"check",!1)),(t===null||t==="false")&&(e.currentTarget.setAttribute("data-checked_item","true"),a.changeValueFromId(e.currentTarget.id,"check",!0))}appendToDom(){this.accordionSection.appendChild(this.accordionElement)}removeFromDom(){this.accordionElement.remove()}}class T{constructor(e,t){this.parentSectionElement=document.getElementById(e),this.elementClass=t,this.localStorageData=null,this.init(),this.removeBtn=a.handleAddBtnClick(this.parentSectionElement.parentElement,"[data-thrash]",this.removeResults.bind(this)),this.checkBtn=this.getCheckBtn()}async init(){this.resetDummy(),this.localStorageData=await a.loadFromLocalStorage(u),await this.getLocalStorageResults()}resetDummy(){this.parentSectionElement.innerHTML=""}async getLocalStorageResults(){const e=this.localStorageData===null,t=e?!0:!this.localStorageData.history,s=t?!0:this.localStorageData.history?.length===0;if(e)this.displayNoResults();else{if(!t){s?this.displayNoResults():this.createAccordionBasedInSavedResults();return}if(t){if(s){this.displayNoResults();return}this.displayNoResults();return}}}displayNoResults(){const e=this.localStorageData?this.localStorageData.lang:document.documentElement.lang||"";let t="No results available";if(e)switch(e){case"en":t="No results available";break;case"es":t="No se encontraron resultados";break;case"fr":t="Aucun résultat disponible";break}this.parentSectionElement.innerHTML=`<p data-unavailable> ${t} <p/>`}createAccordionBasedInSavedResults(){const e=this.localStorageData.history;for(const t in e)if(Object.hasOwnProperty.call(e,t)){const s=e[t].date,r=e[t].title,n=e[t].results,c=e[t].users,l=e[t].chores,i=e[t].id;new f(this.parentSectionElement,r,i,s,l,c,n)}}getCheckBtn(){const e=document.querySelector("[data-check]");return e?.addEventListener("change",this.checkModeOn.bind(this)),e}async checkModeOn(e){const s=e.target.checked;this.showDeleteBtn(s),this.showResultInCheckMode(s)}showDeleteBtn(e){const t=document.querySelector(".sr__options")?.querySelectorAll("[aria-hidden]");for(let s=0;s<t.length;s++){const r=t[s];e&&r.setAttribute("aria-hidden","false"),e||r.setAttribute("aria-hidden","true")}}showResultInCheckMode(e){const t=this.parentSectionElement.children;for(let s=0;s<t.length;s++){const r=t[s].querySelector("[data-showcheckmode]"),n=t[s].querySelector(".accordion-content"),c=t[s].querySelector("& > button");if(e){r?.setAttribute("data-showcheckmode","true"),n?.setAttribute("aria-hidden","true"),c.disabled=!0;continue}r?.setAttribute("data-showcheckmode","false"),n?.setAttribute("aria-hidden","false"),c.disabled=!1}}async removeResults(e){let t=this.localStorageData.history;if(t=await this.getAllCheckedResults(t),t.length!==this.localStorageData.history.length){const s={lang:await a.getLangUserPreference({save:!1}),tour:a.getTourUserPreference({save:!1}),darkMode:a.getDarkModeUserPreference({save:!1}),theme:a.getThemeUserPreference({save:!1}),history:t};a.saveToLocalStorage(u,s),this.exitCheckMode(),this.init()}}exitCheckMode(){this.uncheckCheckbox(),this.removeTrashBtn()}uncheckCheckbox(){const e=document.getElementById("sr__checkmode");console.log(e),e.checked=!1}removeTrashBtn(){document.getElementById("sr__delete_btn").parentElement.setAttribute("aria-hidden","true")}async getAllCheckedResults(e){let t=e;const s=document.querySelector(".sr__accordion").querySelectorAll('[type="checkbox"]');for(let r=0;r<s.length;r++){const n=s[r];if(n.checked){const c=n.id.slice(0,15);t=await t.filter(l=>l.id!==c)}}return t}}window.addEventListener("load",o=>{let e=new T("accordion",f);const t=document.getElementById("saveBtn"),s=document.getElementById("mainBtn");t?.addEventListener("click",r=>{e.init(),s.disabled=!0,setTimeout(()=>{s.disabled=!1},1e3)})});