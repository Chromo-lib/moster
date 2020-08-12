import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';

let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
window.chrome = isChrome ? window.chrome : window.browser;

function extractFileName (fileUrl) {
  if (fileUrl && fileUrl.length > 0) {
    fileUrl = String.raw`${fileUrl}`;
    let extFileName = fileUrl.split('\\').reverse()[0];
    if (extFileName && (extFileName !== undefined || extFileName.length > 0)) {
      return extFileName
    }
  }
}

export default function ListDownloads () {

  const [state, setState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.chrome.downloads.search({}, (downloads) => {
      setState(downloads.slice(0, 30));
      setIsLoading(false);
    });
  }, []);

  const onRm = (file) => {
    let c = window.confirm("Delete? " + extractFileName(file.filename));
    c && window.chrome.downloads.erase({ id: file.id }, () => {
      setIsLoading(true);
      window.chrome.downloads.search({}, (downloads) => {
        setState(downloads.slice(0, 30));
        setIsLoading(false);
      });
    });
  }

  return (<>
    <ul>
      {state && state.map(file => <li key={file.id} className="truncate d-flex-sp">

        <span onClick={() => { window.chrome.downloads.show(file.id) }} className="d-flex-sp truncate">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#fff" d="M572.694 292.093L500.27 416.248A63.997 63.997 0 0 1 444.989 448H45.025c-18.523 0-30.064-20.093-20.731-36.093l72.424-124.155A64 64 0 0 1 152 256h399.964c18.523 0 30.064 20.093 20.73 36.093zM152 224h328v-48c0-26.51-21.49-48-48-48H272l-64-64H48C21.49 64 0 85.49 0 112v278.046l69.077-118.418C86.214 242.25 117.989 224 152 224z"/></svg>
        <span className="truncate ml-10">{extractFileName(file.filename)}</span>
        </span>

        <button onClick={() => { onRm(file) }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#fff" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"/></svg></button>
      </li>)}
    </ul>

    {isLoading && <Spinner />}
  </>);
}