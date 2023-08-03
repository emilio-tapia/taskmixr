interface Input {
  storeArray: Array<Input>;
  inputSection: HTMLElement;
  inputElement: HTMLInputElement;
  displayName: string;
  inputId: string;
}

interface Result {
[x: string]: any;
  chore: string;
  user: string;
  choreId: string;
  resultElement: HTMLElement;
  resultsSection: HTMLElement;
}

interface Chore extends Input {}

export const users: Array<Input> = [];
export const chores: Array<Chore> = [];
export const results: Array<Result> = [];
export let lang = 'en';
export let tour = false;
export let localStorageKey = 'task_assigner_data';

export const dataToStorage = {

};
