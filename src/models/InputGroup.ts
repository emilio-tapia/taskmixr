// ================== INPUT GROUP CLASS ============== //

import { Helpers } from '../helpers/Helpers';
import { localStorageKey } from '../helpers/data';
import type { Input } from './Input';

export interface InputGroup {
  addBtn: HTMLButtonElement;
  parentSectionElement: HTMLElement;
  storeArray: Array<Input>;
  elementClass: any;
  removeBtn: HTMLElement;
  localStorageData: any;
}

export class InputGroup {
  constructor(
    storeArray: Array<Input>,
    sectionSelector: string,
    elementClass: any
  ) {
    this.storeArray = storeArray;
    this.parentSectionElement = document.getElementById(
      sectionSelector
    ) as HTMLElement;
    this.elementClass = elementClass;
    this.localStorageData = null;
    
    this.init(2);
    this.addBtn = Helpers.handleAddBtnClick(
      this.parentSectionElement,
      '.addBtn',
      this.addNewInputElement.bind(this)
    );
    this.removeBtn = this.createRemoveButton();
    this.eventRemoveButton();
  }

  // GROUP INITIALIZATION

  async init(initFields: number) {
    this.resetDummy();
    this.localStorageData = await Helpers.loadFromLocalStorage(localStorageKey);
    await this.getLocalStorageResults(initFields);
  }

  resetDummy() {
    // RETIRE DUMMY ELEMENTS
    this.parentSectionElement.querySelector('[class*="__inputs"]')!.innerHTML =
      '';
  }

  async getLocalStorageResults(initNumber: number) {
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
          await this.createElementBasedInSavedResults();
        } else {
          for (let i = 0; i < initNumber; i++) {
            await this.createElementAndStoreToArray();
          }
        }
        return;
      }

      // IF LOCAL HISTORY DOES NOT EXISTS
      if (isLocalHistoryNull) {
          for (let i = 0; i < initNumber; i++) {
            await this.createElementAndStoreToArray();
          }
        return;
      }
    } else {
      // IF LOCAL STORAGE IS NULL
      for (let i = 0; i < initNumber; i++) {
        await this.createElementAndStoreToArray();
      }
    }

    return
  }

  async createElementAndStoreToArray() {
    this.storeArray.push(
      await new this.elementClass(this.storeArray, this.parentSectionElement)
    );
  }

  async createElementBasedInSavedResults() {
    const localStorageKeyToGet = this.parentSectionElement.id;
    const localStorageHistoryLastIndex =
      this.localStorageData.history.length - 1;

    const localStorageHistoryLastResult =
      this.localStorageData.history[localStorageHistoryLastIndex];
    const localStorageHistoryLastResultKeyObj =
      localStorageHistoryLastResult[localStorageKeyToGet];

    for (const key in localStorageHistoryLastResultKeyObj) {
      if (
        Object.hasOwnProperty.call(localStorageHistoryLastResultKeyObj, key)
      ) {
        const property = key;
        const value = localStorageHistoryLastResultKeyObj[property];

        // CREATE NEW CHILD ELEMENT
        const obj = await new this.elementClass(
          this.storeArray,
          this.parentSectionElement
        );

        // CHANGE THE NAME
        obj.updateDisplayName(`${value}`);

        // PUSH TO STORE ARRAY
        this.storeArray.push(obj);
      }
    }

    return;
  }

  // HANDLE CLICK EVENT - ADD BUTTON
  async addNewInputElement(e: any) {
    await this.storeToArray();
    if (this.storeArray.length > 1) {
      this.appendRemoveBtn();
    }
  }

  // CREATE REMOVE BUTTON
  createRemoveButton() {
    const removeBtn = document.createElement('button');
    removeBtn.className = 'addBtn';
    removeBtn.textContent = '-';
    return removeBtn;
  }

  // HANDLE CLICK EVENT - REMOVE BUTTON
  eventRemoveButton() {
    this.removeBtn.addEventListener('click', (e) => {
      let removedItem = this.storeArray.pop();
      removedItem?.removeFromDom();

      if (this.storeArray.length <= 1) {
        this.removeBtn.remove();
      }
    });
  }

  // APPEND REMOVE BTN TO SECTION
  appendRemoveBtn() {
    const btnsection =
      this.parentSectionElement.querySelector('[class*="__btn"]');
    btnsection?.appendChild(this.removeBtn);
  }

  // STORE TO ARRAY NEW INPUT FIELD
  async storeToArray() {
    return this.storeArray.push(
      new this.elementClass(this.storeArray, this.parentSectionElement)
    );
  }
}
