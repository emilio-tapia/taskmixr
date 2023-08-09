// ================== INPUT GROUP CLASS ============== //

import { Helpers } from '../helpers/Helpers';
import { lang, localStorageKey, tour } from '../helpers/data';
import { Accordion } from './Accordion';

export interface AccordionGroup {
  parentSectionElement: HTMLElement;

  elementClass: any;
  removeBtn: HTMLElement;
  checkBtn: HTMLInputElement;
  localStorageData: any;
}

export class AccordionGroup {
  constructor(sectionSelector: string, elementClass: any) {
    this.parentSectionElement = document.getElementById(
      sectionSelector
    ) as HTMLElement;
    this.elementClass = elementClass;
    this.localStorageData = null;
    this.init();
    this.removeBtn = Helpers.handleAddBtnClick(
      this.parentSectionElement.parentElement!,
      '[data-thrash]',
      this.removeResults.bind(this)
    );
    this.checkBtn = this.getCheckBtn();
  }

  // ===================
  // GROUP INITIALIZATION
  // ===================

  async init() {
    this.resetDummy();
    this.localStorageData = await Helpers.loadFromLocalStorage(localStorageKey);
    await this.getLocalStorageResults();
  }

  resetDummy() {
    this.parentSectionElement.innerHTML = '';
  }

  async getLocalStorageResults() {
    const isLocalStorageNull = this.localStorageData === null;
    // const isLocalStorageEmpty = isLocalStorageNull ? true : Object.keys(this.localStorageData).length === 0;
    const isLocalHistoryNull = !isLocalStorageNull
      ? !Boolean(this.localStorageData.history)
      : true;
    const isLocalHistoryEmpty = !isLocalHistoryNull
      ? this.localStorageData.history?.length === 0
      : true;

    // IF LOCAL STORAGE EXISTS
    if (!isLocalStorageNull) {
      // IF LOCAL HISTORY EXIST
      if (!isLocalHistoryNull) {
        // IF LOCAL HISTORY HAS ITEMS
        if (!isLocalHistoryEmpty) {
          this.createAccordionBasedInSavedResults();
        } else {
          this.displayNoResults();
        }
        return;
      }

      // IF LOCAL HISTORY DOES NOT EXISTS
      if (isLocalHistoryNull) {
        if (isLocalHistoryEmpty) {
          this.displayNoResults();
          return;
        }

        this.displayNoResults();
        return;
      }
    } else {
      this.displayNoResults();
    }
  }

  // ===================
  // ERROR HANDLE
  // ===================

  displayNoResults() {
    const localStorageLang = this.localStorageData
      ? this.localStorageData.lang
      : document.documentElement.lang || '';
    let text = 'No results available';

    if (Boolean(localStorageLang)) {
      switch (localStorageLang) {
        case 'en':
          text = 'No results available';
          break;
        case 'es':
          text = 'No se encontraron resultados';
          break;
        case 'fr':
          text = 'Aucun résultat disponible';
          break;
      }
    }

    this.parentSectionElement.innerHTML = `<p data-unavailable> ${text} <p/>`;
  }

  // ===================
  // CREATE ELEMENT BASED ON SAVED RESULTS
  // ===================

  createAccordionBasedInSavedResults() {
    const localStorageHistory = this.localStorageData.history;
    for (const result in localStorageHistory) {
      if (Object.hasOwnProperty.call(localStorageHistory, result)) {
        const date = localStorageHistory[result].date;
        const customTitle = localStorageHistory[result].title;
        const results = localStorageHistory[result].results;
        const users = localStorageHistory[result].users;
        const chores = localStorageHistory[result].chores;
        const id = localStorageHistory[result].id;

        new Accordion(
          this.parentSectionElement,
          customTitle,
          id,
          date,
          chores,
          users,
          results
        );
      }
    }
  }

  // ===================
  // CHECK MODE
  // ===================

  getCheckBtn() {
    const checkBtn = document.querySelector('[data-check]') as HTMLInputElement;
    checkBtn?.addEventListener('change', this.checkModeOn.bind(this));
    return checkBtn;
  }

  async checkModeOn(e: any) {
    const checkBox = e.target as HTMLInputElement;
    const isCheckModeOn = checkBox!.checked;

    this.showDeleteBtn(isCheckModeOn);
    this.showResultInCheckMode(isCheckModeOn);
  }

  showDeleteBtn(ischeckModeOn: boolean) {
    const deleteBtn = document
      .querySelector('.sr__options')
      ?.querySelectorAll('[aria-hidden]');

    for (let i = 0; i < deleteBtn!.length; i++) {
      const element = deleteBtn![i];
      if (ischeckModeOn) {
        element.setAttribute('aria-hidden', 'false');
      }
      if (!ischeckModeOn) element.setAttribute('aria-hidden', 'true');
    }
  }

  showResultInCheckMode(ischeckModeOn: boolean) {
    const children = this.parentSectionElement.children;
    for (let i = 0; i < children.length; i++) {
      const element = children[i].querySelector('[data-showcheckmode]');
      const content = children[i].querySelector('.accordion-content');
      const button = children[i].querySelector(
        '& > button'
      ) as HTMLButtonElement;

      if (ischeckModeOn) {
        element?.setAttribute('data-showcheckmode', 'true');
        content?.setAttribute('aria-hidden', 'true');
        button!.disabled = true;
        continue;
      }

      element?.setAttribute('data-showcheckmode', 'false');
      content?.setAttribute('aria-hidden', 'false');
      button!.disabled = false;
      continue;
    }
  }

  // ===================
  // REMOVE ELEMENTS IN CHECK MODE
  // ===================

  async removeResults(e: any) {
    let dataToSave = this.localStorageData.history;
    dataToSave = await this.getAllCheckedResults(dataToSave);

    if (dataToSave.length !== this.localStorageData.history.length) {
      const dataToStorage = {
        lang: await Helpers.getLangUserPreference({ save: false }),
        tour: Helpers.getTourUserPreference({ save: false }),
        darkMode: Helpers.getDarkModeUserPreference({ save: false }),
        theme: Helpers.getThemeUserPreference({ save: false }),
        history: dataToSave,
      };

      // // SAVE TO STORAGE
      Helpers.saveToLocalStorage(localStorageKey, dataToStorage);

      this.exitCheckMode();
      this.init();
    }
  }

  exitCheckMode() {
    this.uncheckCheckbox();
    this.removeTrashBtn();
  }

  uncheckCheckbox() {
    const checkElement = document.getElementById(
      'sr__checkmode'
    ) as HTMLInputElement;
    console.log(checkElement);
    checkElement!.checked = false;
  }

  removeTrashBtn() {
    const deleteBtn = document.getElementById('sr__delete_btn')!.parentElement!;
    deleteBtn.setAttribute('aria-hidden', 'true');
  }

  async getAllCheckedResults(data: any) {
    // RESULT DATA WITH GENERAL ID
    let d = data;
    const checkboxes = document
      .querySelector('.sr__accordion')!
      .querySelectorAll('[type="checkbox"]');

    for (let i = 0; i < checkboxes.length; i++) {
      const element = checkboxes[i] as HTMLInputElement; // get checkbox element
      if (element.checked) {
        // IF ELEMENT IS CHECKED
        const id = element.id.slice(0, 15); // remove _checkbox from id
        // RETURN ARRAY FROM ELEMENT THAT ARE NOT CHECKED
        d = await d.filter(
          (element: any) => element.id !== id // RETURN ALL ELEMENT THAT ARE NOT THE SAME RESULT ID
        );
      }
    }

    return d;
  }
}
