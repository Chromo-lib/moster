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
      setState(downloads.slice(0, 20));
      setIsLoading(false);
    });
  }, []);

  const onRm = (file) => {
    let c = window.confirm("Are you sure you wish to delete? " + extractFileName(file.filename));
    c && window.chrome.downloads.erase({ id: file.id }, () => {
      setIsLoading(true);
      window.chrome.downloads.search({}, (downloads) => {
        setState(downloads.slice(0, 20));
        setIsLoading(false);
      });
    });
  }

  return (<>
    <ul>
      {state && state.map(file => <li key={file.id} className="truncate d-flex-sp">

        <span onClick={() => { window.chrome.downloads.show(file.id) }} className="truncate">
          {extractFileName(file.filename)}
        </span>

        <button onClick={() => { onRm(file) }}>D</button>
      </li>)}
    </ul>

    {isLoading && <Spinner />}
  </>);
}