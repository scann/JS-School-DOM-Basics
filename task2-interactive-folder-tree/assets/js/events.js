const folderTree = document.getElementById('folder-tree');
const folderEntries = document.getElementsByClassName('folder-entry');
const folderNames = document.getElementsByClassName('folder-name');

/*wrap all tree entries into SPANs*/
(function wrapEntriesInSpans() {
    for(let i = 0; i < folderEntries.length; i++) {
	const folderEntry = folderEntries[i];
	const span =  document.createElement('span');
	folderEntry.insertBefore(span, folderEntry.firstChild);
	while(span.nextSibling) {
		span.appendChild(span.nextSibling);
	}
  }
}());

/*set folder entries' attribute 'data-highlight' to 'no'*/
(function addDataAttribute() {
	for(let i = 0; i < folderNames.length; i++) {
		const folderName = folderNames[i];
		folderName.setAttribute('data-highlight', 'no');
	}
}());

function handleCollapseExpand(event) {
	event.preventDefault();
	const target = event.target;
	if (target.tagName != 'SPAN') {
        return;
    }
    const childrenContainer = target.parentNode.getElementsByClassName('subfolder-entry');
    if (!childrenContainer) return; // no children

    for(let i = 0; i < childrenContainer.length; i++) {
    childrenContainer[i].hidden = !childrenContainer[i].hidden;	
	}
}

function handleMultiSelection(event) {
	event.preventDefault();
	if (event.shiftKey) {
	const target = event.target;
	let attr = target.getAttribute('data-highlight');
	if (attr == 'no') {
		attr = target.setAttribute('data-highlight', 'yes');
	} else {
			attr = target.setAttribute('data-highlight', 'no');
		}
	}
}

function handleSingleSelection(event) {
	event.preventDefault();
	const activeFolders = document.getElementsByClassName('active');
	if (event.ctrlKey) {
		const target = event.target;
		if(target.classList.contains('active')) {
			target.classList.remove('active');			
			while (activeFolders.length)
    		activeFolders[0].classList.remove('active');
		} else {	  
			while (activeFolders.length)
    		activeFolders[0].classList.remove('active');		
			target.classList.add('active');
		}
	}
}		
function preventTextSelectionOnDblClick(event) {
	event.preventDefault();
}
folderTree.addEventListener('mousedown', preventTextSelectionOnDblClick, false);
folderTree.addEventListener('dblclick', handleCollapseExpand);
folderTree.addEventListener('click', handleMultiSelection);
folderTree.addEventListener('click', handleSingleSelection);
