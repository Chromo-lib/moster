import React, { useState, useEffect } from 'react';

let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
window.chrome = isChrome ? window.chrome : window.browser;

export default function ListHistory () {

  const [allSites, setAllSites] = useState(null);

  useEffect(() => {
    window.chrome.history.search({ text: '', maxResults: 15 }, (historySites) => {
      setAllSites(historySites);
    });
  }, []);

  const onRm = (site) => {
    let c = window.confirm("Are you sure you wish to delete? " + site.title);
    c && window.chrome.history.deleteUrl({ url: site.url }, () => {
      window.chrome.history.search({ text: '', maxResults: 15 }, (historySites) => {
        setAllSites(historySites);
      });
    });
  }

  return (
    <ul>
      {allSites && allSites.map(site => <li key={site.id} className="d-flex-sp truncate">
        <span onClick={() => { window.chrome.downloads.show(site.id) }} className="truncate">
          {site.title}
        </span>

        <button onClick={() => { onRm(site) }}>D</button>
      </li>)}
    </ul>
  );
}