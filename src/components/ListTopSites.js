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
        <a href={site.url} target="_blank" rel="noopener noreferrer" className="d-flex-sp truncate txt-muted">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#fff" d="M448 80v352c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48zm-88 16H248.029c-21.313 0-32.08 25.861-16.971 40.971l31.984 31.987L67.515 364.485c-4.686 4.686-4.686 12.284 0 16.971l31.029 31.029c4.687 4.686 12.285 4.686 16.971 0l195.526-195.526 31.988 31.991C358.058 263.977 384 253.425 384 231.979V120c0-13.255-10.745-24-24-24z" /></svg>
          <span className="truncate ml-10">{site.title}</span>
        </a>
      </li>)}
    </ul>
  );
}