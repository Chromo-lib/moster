let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
chrome = isChrome ? chrome : browser;

(function () {
  // display data for first tab
  onSwitchTab(1);

  // only display the first tab
  Array.from(document.querySelectorAll('.tab')).forEach(el => {
    if (+el.dataset.id !== 1) el.style.display = 'none';
  });

  // handle tabs
  const tabs = document.querySelectorAll('.tab');

  Array.from(document.getElementById('btn-tabs').children).forEach(btn => {
    btn.addEventListener('click', () => {
      Array.from(tabs).forEach(el => {
        el.style.display = 'none';
        if (btn.dataset.id === el.dataset.id) {
          el.style.display = 'block';
          onSwitchTab(el.dataset.id);
          // update header title
          document.querySelector('.title').textContent = el.dataset.title;
        }
      });
    }, false);
  });
})();

function handleDrops () {
  Array.from(document.querySelectorAll('.drop')).forEach(el => {

    console.log(el);
    el.addEventListener('click', () => {
      console.log(el.dataset.id);
      document.getElementById(el.dataset.id).style.display = 'flex';
    }, false);
  });
}

function onSwitchTab (tab) {
  switch (parseInt(tab, 10)) {
    case 3:
      chrome.history.search({ text: '', maxResults: 15 }, (historySites) => {
        const historyUl = document.getElementById('list-history');
        historyUl.innerHTML = '';

        historySites.forEach((site) => {
          if (site.title && site.url) {
            const list = createList(site.title, site.url, 'history');
            historyUl.appendChild(list);
          }
        });
      });
      break;

    case 2:
      chrome.downloads.search({}, (downloads) => {
        const downloadsUl = document.getElementById('list-downloads');
        downloadsUl.innerHTML = '';

        downloads.slice(0, 15).forEach(file => {
          const list = createList(extractFileName(file.filename), file.filename, 'downloads');
          downloadsUl.appendChild(list);
        });
      });

    default:
      chrome.topSites.get((sites) => {
        const topSitesUl = document.getElementById('list-top-sites');
        topSitesUl.innerHTML = '';
        sites.forEach((site) => {
          if (site.title && site.url) {
            topSitesUl.appendChild(createList(site.title, site.url, 'top'));
          }
        });
      });
      break;
  }
}
