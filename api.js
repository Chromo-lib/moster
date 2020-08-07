function createList (title, url, tabName) {
  const li = document.createElement('li');
  const titleEl = document.createElement('span');
  const drop = document.createElement('span');

  titleEl.textContent = title;
  //link.target = '_blank';
  //link.rel = 'noopener';
  titleEl.classList.add('truncate');

  let svg = '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="ellipsis-v" class="svg-inline--fa fa-ellipsis-v fa-w-6" role="img" viewBox="0 0 192 512"><path fill="#fff" d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z"/></svg>';

  drop.innerHTML = svg;
  const dropdown = document.createElement('div');
  dropdown.classList.add('dropdown');

  const btnGo = document.createElement('button');
  const btnDelete = document.createElement('button');
  btnGo.textContent = 'g';
  btnDelete.textContent = 'x';

  dropdown.appendChild(btnGo);
  dropdown.appendChild(btnDelete);
  dropdown.id = url;

  drop.classList.add('drop');
  drop.dataset.id = url;
  drop.appendChild(dropdown);

  li.appendChild(titleEl);
  li.appendChild(drop);

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