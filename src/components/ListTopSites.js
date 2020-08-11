import React, { useState, useEffect } from 'react';

let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
window.chrome = isChrome ? window.chrome : window.browser;

export default function ListTopSites () {

  const [allSites, setAllSites] = useState(null);

  useEffect(() => {
    window.chrome.topSites.get((sites) => {
      setAllSites(sites);
    });
  }, []);

  return (
    <ul>
      {allSites && allSites.map(site => <li key={site.id} className="truncate">
        <a href={site.url} target="_blank" rel="noopener noreferrer" className="truncate txt-muted">{site.title}</a>
      </li>)}
    </ul>
  );
}