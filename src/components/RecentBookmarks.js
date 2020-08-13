import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';

let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
window.chrome = isChrome ? window.chrome : window.browser;

export default function RecentBookmarks () {
  const [bookmarks, setBookmarks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.chrome.bookmarks.getRecent(30, (bks) => {
      setBookmarks(bks);
      setIsLoading(false);
    });
  }, []);

  const onRm = (bk) => {
    let c = window.confirm("Delete? " + bk.title);
    c && window.chrome.bookmarks.remove(bk.id, () => {
      setIsLoading(true);
      window.chrome.bookmarks.getRecent(30, (bks) => {
        setBookmarks(bks);
        setIsLoading(false);
      });
    });
  }

  return (<>
    <ul>
      {bookmarks && bookmarks.map(bk => <li key={bk.id} className="d-flex-sp truncate">
        <a href={bk.url} target="_blank" rel="noopener noreferrer" className="d-flex-sp truncate txt-muted">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#fff" d="M448 80v352c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48zm-88 16H248.029c-21.313 0-32.08 25.861-16.971 40.971l31.984 31.987L67.515 364.485c-4.686 4.686-4.686 12.284 0 16.971l31.029 31.029c4.687 4.686 12.285 4.686 16.971 0l195.526-195.526 31.988 31.991C358.058 263.977 384 253.425 384 231.979V120c0-13.255-10.745-24-24-24z" /></svg>
          <span className="truncate ml-10">{bk.title}</span>
        </a>

        <button onClick={() => { onRm(bk) }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#fff" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z" /></svg></button>
      </li>)}
    </ul>

    {isLoading && <Spinner />}
  </>);
}