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

        <button onClick={() => { onRm(site) }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#fff" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"/></svg></button>
      </li>)}
    </ul>

    {isLoading && <Spinner />}
  </>);
}