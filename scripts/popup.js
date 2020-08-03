let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
chrome = isChrome ? chrome : browser;

chrome.topSites.get((sites) => {

  const topSitesUl = document.getElementById('top-sites');

  sites.forEach((site) => {
    if (!site.title || !site.url) { }
    else {
      const li = document.createElement('li');
      const link = document.createElement('a');

      const gotoEl = document.createElement('a');

      link.href = site.url;
      link.textContent = site.title;
      link.target = '_blank';
      link.rel = 'noopener';

      gotoEl.textContent = '>';
      gotoEl.href = site.url;
      gotoEl.target = '_blank';

      link.classList.add('truncate');

      li.appendChild(link);
      li.appendChild(gotoEl);

      topSitesUl.appendChild(li);
    }
  });
});
