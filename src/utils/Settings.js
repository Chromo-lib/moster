let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
window.chrome = isChrome ? window.chrome : window.browser;

export default class Settings {
  static init () {
    window.chrome.storage.local.get(['theme'], function (result) {
      if (result && result.theme) {
        const htmlTag = document.getElementsByTagName("html")[0];
        htmlTag.dataset.theme = result.theme;
      }
    });
  }

  static switch () {
    const htmlTag = document.getElementsByTagName("html")[0];

    if (htmlTag.dataset.theme === "light") {
      window.chrome.storage.local.set({ theme: 'dark' }, () => {
        htmlTag.dataset.theme = 'dark';
      });
    } else {
      window.chrome.storage.local.set({ theme: 'light' }, () => {
        htmlTag.dataset.theme = 'light';
      });
    }
  }
}