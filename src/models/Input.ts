  // ================== INPUT CLASS ============== //

import { Helpers } from "../helpers/Helpers";

  export interface Input {
      storeArray: Array<Input>;
      inputSection: HTMLElement;
      inputElement: HTMLInputElement;
      displayName: string;
      inputId: string;
  }

  export class Input {
    constructor({storeArray, section, id, displayName}:any) {
      this.storeArray = storeArray;
      this.inputSection = section;
      this.inputId = id || this.setNewId();
      this.displayName = displayName ? `${(displayName)} ${this.storeArray.length + 1}` : `${Helpers.capitalizeFirstLetter(
        Helpers.removeLastLetter(this.inputSection.id)
      )} ${this.storeArray.length + 1}`;
      this.inputElement = this.createInputElement();
      this.handleInputChange();
      this.appendToDom();
    }

    setNewId() {
      return `input_${Helpers.removeLastLetter(this.inputSection.id)}_${
        this.storeArray.length + 1
      }`;
    }

    createInputElement() {
      const newInput = document.createElement('input');
      newInput.id = this.setNewId();
      newInput.type = 'text';
      newInput.placeholder = this.displayName;

      return newInput;
    }

    appendToDom() {
      this.inputSection
        .querySelector('[class*="inputs"]')
        ?.appendChild(this.inputElement);
    }

    removeFromDom() {
      this.inputElement.remove();
    }

    handleInputChange() {
      this.inputElement.addEventListener('input', (e) => {
        this.displayName = this.inputElement.value;
      });
    }

    updateDisplayName(value: string) {
      this.displayName = value;
      this.inputElement.value = this.displayName;
    }
  }