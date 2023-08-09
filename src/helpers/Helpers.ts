import {
  chores,
  lang,
  localStorageKey,
  results,
  users,
} from '../helpers/data.ts';

export class Helpers {
  static Helpers: any;
  constructor() {}

  static handleAddBtnClick(
    section: HTMLElement,
    selector: string,
    callBackEvent?: any
  ) {
    // console.log(section, selector);
    const addBtn: HTMLButtonElement = Helpers.getBtn(section, selector);
    addBtn?.addEventListener('click', callBackEvent);
    return addBtn;
  }

  static getBtn(section: HTMLElement, selector: string): HTMLButtonElement {
    return section.querySelector(selector) as HTMLButtonElement;
  }

  static capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  static removeLastLetter(string: string) {
    return (string = string.slice(0, -1));
  }

  static getTodayDate(isId: boolean) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    const seconds = String(today.getSeconds()).padStart(2, '0');

    switch (isId) {
      case true:
        return `${year}${month}${day}_${hours}${minutes}${seconds}`;
        break;
      case false:
        return `${year}-${month}-${day}`;
        break;
    }
  }

  // Function to save data to local storage
  static saveToLocalStorage(key: string, data: any) {
    try {
      // console.log('DATA TO STORE', data);
      const serializedData = JSON.stringify(data);
      localStorage.setItem(key, serializedData);
      // console.log(`Data saved successfully with key: ${key}`);
    } catch (error) {
      // console.error('Error saving data to local storage:', error);
    }
  }

  // Function to load data from local storage
  static loadFromLocalStorage(key: string) {
    try {
      const serializedData = localStorage.getItem(key);
      if (serializedData === null) {
        // console.log(`No data found with key: ${key}`);
        return null;
      }

      const data = JSON.parse(serializedData);
      // console.log(`Data loaded successfully with key: ${key}`);
      return data;
    } catch (error) {
      // console.error('Error loading data from local storage:', error);
      return null;
    }
  }

  static changeValueFromId(idResult: string, att: string, value: any) {
    const localStorageData =
      Helpers.loadFromLocalStorage(localStorageKey).history;
    const idAccordion = idResult.slice(0, 15);
    const selectedAccordion = localStorageData.filter(
      (element: any) => element.id === idAccordion
    );
    const resultsAccordion = selectedAccordion[0].results;

    for (const key in resultsAccordion) {
      if (
        resultsAccordion.hasOwnProperty(key) &&
        resultsAccordion[key].hasOwnProperty('id')
      ) {
        if (resultsAccordion[key].id === idResult) {
          resultsAccordion[key].checked = !resultsAccordion[key].checked;
        }
      }
    }

    const dataToSave = localStorageData.map((element: any) => {
      if (element.id === selectedAccordion[0].id) {
        return selectedAccordion[0];
      }
      return element;
    });

    const dataToStorage = {
      lang: lang,
      darkMode: Helpers.getDarkModeUserPreference({ save: false }),
      theme: Helpers.getThemeUserPreference({ save: false }),
      history: dataToSave,
    };

    // // SAVE TO STORAGE
    Helpers.saveToLocalStorage(localStorageKey, dataToStorage);
  }

  static getDarkModeUserPreference({ save }: any) {
    // get checked att
    const darkModeCheckbox = document.getElementById(
      'darkModeSwitch'
    ) as HTMLInputElement;
    const isChecked = darkModeCheckbox.checked;
    const isNavDarkMode = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    let darkModeSettings = {
      userDarkMode: isChecked,
      navDarkMode: isNavDarkMode,
    };
    // let mapDarkMode = new Map(Object.entries(darkModeSettings));

    if (save === true) {
      const localStorageData = Helpers.loadFromLocalStorage(localStorageKey);

      // SET GENERAL LOCAL STORAGE OBJECT
      const dataToStorage = {
        ...localStorageData,
        darkMode: darkModeSettings,
      };

      // SAVE TO STORAGE
      Helpers.saveToLocalStorage(localStorageKey, dataToStorage);
    }

    return darkModeSettings;
  }

  static getThemeUserPreference({ save }: any) {
    // get checked att
    const themeSelectorAtt = document.documentElement.dataset['themeGeneral'];

    if (save === true) {
      const localStorageData = Helpers.loadFromLocalStorage(localStorageKey);

      // SET GENERAL LOCAL STORAGE OBJECT
      const dataToStorage = {
        ...localStorageData,
        theme: themeSelectorAtt,
      };

      // SAVE TO STORAGE
      Helpers.saveToLocalStorage(localStorageKey, dataToStorage);
    }

    return themeSelectorAtt;
  }

  static async getLangUserPreference({ save }: any) {
    try {
      // get checked att
      const langSelectorAtt = document.documentElement.lang;
      // console.log(langSelectorAtt);

      if (save === true) {
        const localStorageData = Helpers.loadFromLocalStorage(localStorageKey);

        // SET GENERAL LOCAL STORAGE OBJECT
        const dataToStorage = {
          ...localStorageData,
          lang: langSelectorAtt,
        };

        // SAVE TO STORAGE
        Helpers.saveToLocalStorage(localStorageKey, dataToStorage);
      }
      return langSelectorAtt;
    } catch (error) {
      // console.log(error);
    }
  }

  static getTourUserPreference({ save }: any) {
    const tourAtt = Helpers.loadFromLocalStorage(localStorageKey).tour || true;

    if (save === true) {
      const localStorageData = Helpers.loadFromLocalStorage(localStorageKey);

      // SET GENERAL LOCAL STORAGE OBJECT
      const dataToStorage = {
        ...localStorageData,
        tour: tourAtt,
      };

      // SAVE TO STORAGE
      Helpers.saveToLocalStorage(localStorageKey, dataToStorage);
    }

    return tourAtt;
  }

  static detectTouchscreen() {
    var result = false;
    if (window.PointerEvent && 'maxTouchPoints' in navigator) {
      // if Pointer Events are supported, just check maxTouchPoints
      if (navigator.maxTouchPoints > 0) {
        result = true;
      }
    } else {
      // no Pointer Events...
      if (
        window.matchMedia &&
        window.matchMedia('(any-pointer:coarse)').matches
      ) {
        // check for any-pointer:coarse which mostly means touchscreen
        result = true;
      } else if (window.TouchEvent || 'ontouchstart' in window) {
        // last resort - check for exposed touch events API / event handler
        result = true;
      }
    }
    return result;
  }
}
