import { Helpers } from '../helpers/Helpers';
import { chores, lang, localStorageKey, results, tour, users } from '../helpers/data';
import { ButtonClick } from './ButtonClick';

export class SaveButton extends ButtonClick {
  constructor(selector: string) {
    super(selector);
  }

  resultToStore() {
    const resultsToStorage = {};
    for (let i = 0; i < results.length; i++) {
      Object.assign(resultsToStorage, {
        [results[i].choreId]: {
          chore: results[i].chore,
          user: results[i].user,
          checked: false,
          id: `${Helpers.getTodayDate(true)}_${results[i].choreId}`,
        },
      });
    }

    return resultsToStorage;
  }

  usersToStore() {
    const usersToStorage = {};
    for (let i = 0; i < users.length; i++) {
      Object.assign(usersToStorage, {
        [users[i].inputId]: users[i].displayName,
      });
    }

    return usersToStorage;
  }

  choresToStore() {
    const choresToStorage = {};
    for (let i = 0; i < chores.length; i++) {
      Object.assign(choresToStorage, {
        [chores[i].inputId]: chores[i].displayName,
      });
    }

    return choresToStorage;
  }

  async handleBtnClick(e: Event) {
    try {
      // GET LOCAL STORAGE HISTORY
      const localStorage = Helpers.loadFromLocalStorage(localStorageKey);
      console.log(localStorage);

      // CHECK IF HISTORY EXISTS
      let historyData = [];

        if(Object.is(localStorage, null)){
          throw new Error("No local storage")
        } else {
          if(!!localStorage.history){
            historyData = localStorage.history
          }
        }

      // SET GENERAL LOCAL STORAGE OBJECT

      let dataToStorage = {
        lang:  Helpers.getLangUserPreference({ save: false }),
        tour: Helpers.getTourUserPreference({ save: false }),
        darkMode: Helpers.getDarkModeUserPreference({ save: false }),
        theme: Helpers.getThemeUserPreference({ save: false }),
        history: [...historyData, this.resultToStorage()],
      };

      // SAVE TO STORAGE
      Helpers.saveToLocalStorage(localStorageKey, dataToStorage);
      this.disableButton();
      return e;
    } catch (error) {}
  }

  resultToStorage() {
    // POPULATE LOCAL STORAGE OBJECTS WITH ONLY NEEDED DATA
    const usersToStorage = this.usersToStore(),
      choresToStorage = this.choresToStore(),
      resultsToStorage = this.resultToStore();

    return {
      id: Helpers.getTodayDate(true),
      title: this.getCustomTitleValue(),
      date: Helpers.getTodayDate(false),
      users: { ...usersToStorage },
      chores: { ...choresToStorage },
      results: { ...resultsToStorage },
    };
  }

  getCustomTitleValue() {
    const titleInputElement = document.getElementById(
      'results__title'
    ) as HTMLInputElement;

    return titleInputElement.value ? titleInputElement.value : null;
  }
}
