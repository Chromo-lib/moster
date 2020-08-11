import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';

let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
window.chrome = isChrome ? window.chrome : window.browser;

export default function ListHistory () {

  const [allSites, setAllSites] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.chrome.history.search({ text: '', maxResults: 30 }, (historySites) => {
      setAllSites(historySites);
      setIsLoading(false);
    });
  }, []);

  const onRm = (site) => {
    let c = window.confirm("Are you sure you wish to delete? " + site.title);
    c && window.chrome.history.deleteUrl({ url: site.url }, () => {
      setIsLoading(true);
      window.chrome.history.search({ text: '', maxResults: 30 }, (historySites) => {
        setAllSites(historySites);
        setIsLoading(false);
      });
    });
  }

  return (<>
    <ul>
      {allSites && allSites.map(site => <li key={site.id} className="d-flex-sp truncate">
        <a href={site.url} target="_blank" rel="noopener noreferrer" className="truncate txt-muted">
          {site.title}
        </a>

        <button onClick={() => { onRm(site) }}>D</button>
      </li>)}
    </ul>

    {isLoading && <Spinner />}
  </>);
}