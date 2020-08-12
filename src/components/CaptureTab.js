import React, { useState } from 'react';

let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
window.chrome = isChrome ? window.chrome : window.browser;

export default function CaptureTab () {

  const [imgURL, setImgURL] = useState(null);

  const onCapture = () => {
    window.chrome.tabs.captureVisibleTab(null, { format: 'png' }, (imageURL) => {
      setImgURL(imageURL);
    });
  }

  const onDownload = () => {
    const link = document.createElement('a');
    link.href = imgURL;
    link.download = 'moster-sites.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="w-100 h-100 d-flex-col cp-tab">
      {imgURL
        ? <>
          <button onClick={onCapture}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#fff" d="M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z" /></svg> capture</button>          
          <div className="w-100"><img src={imgURL} alt="captured tab" className="w-100" /></div>
          <button onClick={onDownload}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#fff" d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z" /></svg> download</button>
        </>
        : <button onClick={onCapture} className="h-100 w-100 p-0 m-0"><svg className="w-52" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#fff" d="M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z" /></svg></button>}
    </div>
  );
}
