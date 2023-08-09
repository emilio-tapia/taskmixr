// ================== CHORE GROUP CLASS ============== //

import type { Input } from './Input';
import { InputGroup } from './InputGroup';
import { Result } from './ResultMainScreen';

export interface ChoreGroup extends InputGroup {
  resultsArray: Array<Result>;
}

export class ChoreGroup extends InputGroup {
  constructor(
    storeArray: Array<Input>,
    selector: string,
    elementClass: any,
    resultsArray: Array<Result>
  ) {
    super(storeArray, selector, elementClass);
    this.resultsArray = resultsArray;
  }

  // GROUP INITIALIZATION

  async getLocalStorageResults(initNumber: number) {
    const isLocalStorageNull = this.localStorageData === null;
    // const isLocalStorageEmpty = isLocalStorageNull ? true : Object.keys(this.localStorageData).length === 0;
    const isLocalHistoryNull = !isLocalStorageNull ? !Boolean(this.localStorageData.history) : true;
    const isLocalHistoryEmpty = !isLocalHistoryNull ? this.localStorageData.history?.length === 0 : true;

    // IF LOCAL STORAGE EXISTS
    if (!isLocalStorageNull) {
      // IF LOCAL HISTORY EXIST
      if (!isLocalHistoryNull) {
        // IF LOCAL HISTORY HAS ITEMS
        if (!isLocalHistoryEmpty) {
          await this.createElementBasedInSavedResults();
          for (let i = 0; i < this.storeArray.length; i++) {
            await this.createResultAndStoreToArray(i);
            await this.setElementEventToInputChange(this.storeArray[i]);
          }
        } else {
          for (let i = 0; i < initNumber; i++) {
            await this.createElementAndStoreToArray();
            await this.createResultAndStoreToArray(i);
            this.setElementEventToInputChange();
          }
        }
        return;
      }

      // IF LOCAL HISTORY DOES NOT EXISTS
      if (isLocalHistoryNull) {
        for (let i = 0; i < initNumber; i++) {
          await this.createElementAndStoreToArray();
          await this.createResultAndStoreToArray(i);
          this.setElementEventToInputChange();
        }
        return;
      }
    } else {
      for (let i = 0; i < initNumber; i++) {
        await this.createElementAndStoreToArray();
        await this.createResultAndStoreToArray(i);
        this.setElementEventToInputChange();
      }
    }
    return
  }

  async createResultAndStoreToArray(index: number) {
    this.resultsArray.push(
      new Result(
        this.storeArray[index].displayName,
        '???',
        this.storeArray[index].inputId
      )
    );
  }

  // HANDLE BTN ADD CLICK
  async addNewInputElement(e: any) {
    await this.storeToArray();
    this.createNewResult(
      this.storeArray[this.storeArray.length - 1].displayName,
      '???',
      this.storeArray[this.storeArray.length - 1].inputId
    );
    this.setElementEventToInputChange();
    this.appendRemoveBtn();
    // this.events();
  }

  // CREATE RESULT FIELD OF LAST ELEMENT IN RESULTS ARRAY
  createNewResult(chore: string, user: string = '???', id: string) {
    this.resultsArray.push(new Result(chore, user, id));
  }

  // INPUT CHANGE FIELD EVENT

  async setElementEventToInputChange(inputElement?: Input) {
    const element = inputElement
      ? inputElement
      : this.storeArray[this.storeArray.length - 1];
    const lastResultElement = this.resultsArray[this.resultsArray.length - 1];
    element.inputElement.addEventListener('input', (e) => {
      // lastResultElement.chore = element.inputElement.value
      lastResultElement.updateChore(element.inputElement.value);
    });
  }

  // HANDLE CLICK EVENT - REMOVE BUTTON
  eventRemoveButton() {
    this.removeBtn.addEventListener('click', (e) => {
      let removedItem = this.storeArray.pop();
      let removedResult = this.resultsArray.pop();
      removedItem?.removeFromDom();
      removedResult?.removeResult();

      if (this.storeArray.length <= 1) {
        this.removeBtn.remove();
      }
    });
  }
}
