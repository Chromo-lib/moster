function createList (title, url) {
  const li = document.createElement('li');
  const link = document.createElement('a');
  const gotoEl = document.createElement('a');

  link.href = url;
  link.textContent = title;
  link.target = '_blank';
  link.rel = 'noopener';

  gotoEl.textContent = '>';
  gotoEl.href = url;
  gotoEl.target = '_blank';

  link.classList.add('truncate');

  li.appendChild(link);
  li.appendChild(gotoEl);

  return li;
}

// /[^\\.]+(?=\.)/gi : "C:\Users\haike\Downloads\tabCapture.zip" => tabCapture.zip
function extractFileName (fileUrl) {
  if (fileUrl && fileUrl.length > 0) {
    fileUrl = String.raw`${fileUrl}`;
    let extFileName = fileUrl.split('\\').reverse()[0];
    if (extFileName && (extFileName !== undefined || extFileName.length > 0)) {
      return extFileName
    }
  }
}