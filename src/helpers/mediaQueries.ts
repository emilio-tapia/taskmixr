import { Helpers } from './Helpers';
import { localStorageKey, lang } from './data';
import { initDriver } from './driver';

export function windowLoadDarkModeCheck() {
  // LOAD LOCAL STORAGE
  const localStorageData = Helpers.loadFromLocalStorage(localStorageKey);

  if (localStorageData === null) {
    setDarkModeToDOM();
    Helpers.getDarkModeUserPreference({ save: true });
    return;
  }

  // IF NOT LOCAL STORAGE, USE NAVIGATOR
  if (!localStorageData.darkMode) {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      setDarkModeToDOM();
      Helpers.getDarkModeUserPreference({ save: true });
      return;
    }
  }

  if (localStorageData.darkMode.userDarkMode) {
    setDarkModeToDOM();
    return;
  }

  setLightModeToDOM();
  return;

  function setDarkModeToDOM() {
    const darkModeCheckbox = document.getElementById(
      'darkModeSwitch'
    ) as HTMLInputElement;
    const darkModeLabel = darkModeCheckbox.nextElementSibling;
    // SET ATT TO HTML
    document.documentElement.dataset['mode'] = 'dark';
    // SET CHECK TO CHECKBOX
    darkModeCheckbox.checked = true;
    // ASSIGN CORRECT SVG ICON
    darkModeLabel!.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path d="M12 11.807A9.002 9.002 0 0 1 10.049 2a9.942 9.942 0 0 0-5.12 2.735c-3.905 3.905-3.905 10.237 0 14.142 3.906 3.906 10.237 3.905 14.143 0a9.946 9.946 0 0 0 2.735-5.119A9.003 9.003 0 0 1 12 11.807z"></path></svg>
          `;
  }

  function setLightModeToDOM() {
    const darkModeCheckbox = document.getElementById(
      'darkModeSwitch'
    ) as HTMLInputElement;
    // SET ATT TO HTML
    document.documentElement.dataset['mode'] = 'light';
    darkModeCheckbox.checked = false;
  }
}

export function windowLoadThemeCheck() {
  const localStorageData = Helpers.loadFromLocalStorage(localStorageKey);

  if (localStorageData === null) {
    setThemeDefault();
    Helpers.getThemeUserPreference({ save: true });
    return;
  }

  // IF NOT LOCAL STORAGE, USE NAVIGATOR
  if (!localStorageData.theme) {
    setThemeDefault();
    Helpers.getThemeUserPreference({ save: true });
    return;
  }

  setThemeByColor(localStorageData.theme);
  return;

  function setThemeByColor(data: string) {
    document.documentElement.dataset['themeGeneral'] = data;
  }

  function setThemeDefault() {
    document.documentElement.dataset['themeGeneral'] = 'purple';
  }
}

export function windowLoadLangCheck() {
  const localStorageData = Helpers.loadFromLocalStorage(localStorageKey);

  if (localStorageData.lang) {
    if(localStorageData.lang !== document.documentElement.lang){
      window.location.href = localStorageData.lang;
    }
    return;
  }

  if (localStorageData === null) {
    setLangDefault();
    Helpers.getLangUserPreference({ save: true });
    return;
  }

  // IF NOT LOCAL STORAGE, USE NAVIGATOR
  if (!localStorageData.lang) {
    setLangDefault();
    Helpers.getLangUserPreference({ save: true });
    return;
  }

  return;

  function setLangDefault() {
    document.documentElement.lang = 'en';
  }
}

export function windowLoadTourCheck() {
  const localStorageData = Helpers.loadFromLocalStorage(localStorageKey);

  if (localStorageData === null) {
    initDriver()
    Helpers.getTourUserPreference({ save: true });
    return;
  }

  // IF NOT LOCAL STORAGE, USE NAVIGATOR
  if (!localStorageData.tour) {
    initDriver()
    Helpers.getTourUserPreference({ save: true });
    return;
  }
  return;


}
