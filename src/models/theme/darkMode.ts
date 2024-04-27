export function setupDarkMode() {
  // page load or when changing themes, best to add inline in `head` to avoid FOUC
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    setDarkMode();
  } else {
    setLightMode();
  }
}

export function setDarkMode() {
  document.documentElement.classList.add("dark");
  saveDarkMode({ isDark: true });
}

export function setLightMode() {
  document.documentElement.classList.remove("dark");
  saveDarkMode({ isDark: false });
}

export function saveDarkMode({ isDark = true }) {
  isDark ? (localStorage.theme = "dark") : (localStorage.theme = "light");
}

export function deleteDarkMode() {
  // Whenever the user explicitly chooses to respect the OS preference
  localStorage.removeItem("theme");
}
