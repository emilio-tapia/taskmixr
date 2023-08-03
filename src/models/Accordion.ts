// ================== INPUT CLASS ============== //

import { Helpers } from '../helpers/Helpers';

export interface Accordion {
  accordionSection: HTMLElement;
  accordionElement: HTMLDivElement;
  accordionId: string;
  customtitle: string;
  date: string;
  chores: Object;
  users: Object;
  results: any;
  titleBtn: HTMLButtonElement;
}

export class Accordion {
  constructor(
    section: HTMLElement,
    customtitle: string,
    id: string,
    date: string,
    chores: Object,
    users: Object,
    results: any
  ) {
    this.accordionSection = section;
    this.accordionId = id;
    this.customtitle = customtitle;
    this.results = results;
    this.chores = chores;
    this.users = users;
    this.date = date;
    this.titleBtn;
    this.accordionElement = this.createAccordionElement();
    this.appendToDom();
    this.handleAccordionClick();
  }

  handleAccordionClick() {
    this.titleBtn.addEventListener('click', toggleAccordion);

    function toggleAccordion(this: any) {
      // const btn = this.querySelector('& > button');
      const itemToggle = this.getAttribute('aria-expanded');
      console.log();

      const allAccordions = this.parentNode.querySelectorAll('button');

      for (let i = 0; i < allAccordions.length; i++) {
        allAccordions[i].setAttribute('aria-expanded', 'false');
      }

      if (itemToggle == 'false') {
        this.setAttribute('aria-expanded', 'true');
      }
    }
  }

  createAccordionElement() {
    const newAccordionContainer = document.createElement('div');
    newAccordionContainer.className = 'accordion-item';
    newAccordionContainer.id = this.accordionId;
    const checkInput = this.createCheckItem();
    const titleBtn = this.createAccordionTitle(this.date, this.customtitle);
    const content = this.createAccordionContent(this.createResultsItem());
    newAccordionContainer.appendChild(checkInput);
    newAccordionContainer.appendChild(titleBtn);
    newAccordionContainer.appendChild(content);
    this.createResultsItem();
    this.titleBtn = titleBtn;

    return newAccordionContainer;
  }

  createCheckItem() {
    const checkContainer = document.createElement('div');
    checkContainer.id = `${this.accordionId}__checkcontainer`;
    checkContainer.className = `accordion__check`;
    checkContainer.setAttribute('data-showCheckMode', 'false');
    const check = document.createElement('input');
    check.type = 'checkbox';
    check.name = `${this.accordionId}__checkbox`;
    check.id = `${this.accordionId}__checkbox`;
    const label = document.createElement('label');
    label.htmlFor = `${this.accordionId}__checkbox`;
    label.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM5 19V5h14l.002 14H5z"></path></svg>

      `;
    check.addEventListener('change', this.checkMode.bind(this));
    checkContainer.appendChild(check);
    checkContainer.appendChild(label);
    return checkContainer;
  }

  checkMode(e: any) {
    const label = e.target.nextElementSibling;
    const checkboxId = e.target.id;
    const isChecked = e.target.checked;

    if (isChecked) {
      label.children[0].innerHTML = `<path d="m10.933 13.519-2.226-2.226-1.414 1.414 3.774 3.774 5.702-6.84-1.538-1.282z"></path><path d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM5 19V5h14l.002 14H5z"></path>`;
    } else {
      label.children[0].innerHTML = `
        <path d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM5 19V5h14l.002 14H5z"></path>`;
    }
  }

  createAccordionTitle(dateid: string, customTitle: string) {
    const btn = document.createElement('button');
    btn.setAttribute('aria-expanded', 'false');
    btn.id = `${this.accordionId}__btn`;
    const spanDateID = document.createElement('span');
    spanDateID.className = 'accordion-title';
    spanDateID.textContent = dateid;
    const spanCustomTitle = document.createElement('span');
    spanCustomTitle.className = 'accordion-title';
    // spanCustomTitle.setAttribute('aria-hidden', 'true');
    spanCustomTitle.textContent = customTitle;

    btn.appendChild(spanDateID);
    btn.appendChild(spanCustomTitle);
    return btn;
  }

  createAccordionContent(resultsFragment: DocumentFragment) {
    const layout = document.createElement('div');
    layout.className = 'accordion-content';
    const content = document.createElement('div');
    content.id = `${this.accordionId}__content`;
    content.appendChild(resultsFragment);
    layout.appendChild(content);

    return layout;
  }

  createResultsItem() {
    const fragment = new DocumentFragment();
    for (const result in this.results) {
      if (Object.hasOwnProperty.call(this.results, result)) {
        // console.log(this.accordionId);
        const chore = this.results[result].chore;
        const user = this.results[result].user;
        const id = this.results[result].id;
        const isChecked = this.results[result].checked;
        const row = document.createElement('hr');
        const resultElement = document.createElement('div');
        resultElement.className = 'accordion-result';
        isChecked ? resultElement.setAttribute('data-checked_item', 'true') : '';
        const spanChore = document.createElement('span');
        spanChore.textContent = `${chore}`;
        const spanUser = document.createElement('span');
        spanUser.textContent = user;
        resultElement.id = id;
        resultElement.appendChild(spanChore);
        resultElement.appendChild(row);
        resultElement.appendChild(spanUser);
        resultElement.addEventListener(
          'click',
          this.checkedResultElement.bind(this)
        );
        fragment.appendChild(resultElement);
      }
    }

    return fragment;
  }

  checkedResultElement(e: any) {
    let isChecked = e.currentTarget.getAttribute('data-checked_item');

    if (isChecked === 'true') {
      e.currentTarget.removeAttribute('data-checked_item');
      Helpers.changeValueFromId(e.currentTarget.id, 'check', false);
    }

    if (isChecked === null || isChecked === 'false') {
      e.currentTarget.setAttribute('data-checked_item', 'true');
      Helpers.changeValueFromId(e.currentTarget.id, 'check', true);
    }

  }

  appendToDom() {
    this.accordionSection.appendChild(this.accordionElement);
  }

  removeFromDom() {
    this.accordionElement.remove();
  }
}
