function createElementFromHTML(htmlString) {
    // https://stackoverflow.com/a/35385518
    const template = document.createElement('template');
    htmlString = htmlString.trim();
    template.innerHTML = htmlString;
    return template.content.firstChild;
}

function getPopupID() {
    return 'YTClipperPopup'
}

function addPopupControls() {
    if (document.getElementById(getPopupID())) return; // We've already added the popup
    const player = document.getElementById('movie_player');
    const popup = createElementFromHTML(`<span class="popuptext" id="`+ getPopupID() + `">A Simple Popup!</span>`);

    // Add the popup directly below the player
    player.parentNode.insertBefore(popup, player.nextSibling);

    // Set the popup's style
    popup.style.backgroundColor = 'red';
}


function getButtonID() {
    return 'YTClipper';
}

function addButton() {

    const playerControls = document.getElementsByClassName('ytp-left-controls')[0];
    if (!playerControls) {
        console.log('YTClipper failed to get player controls');
        return;
    }
    
    if (document.getElementById(getButtonID())) return; // We've already added the button

    // Make a custom button by copying the play button
    const playButton = playerControls.getElementsByClassName('ytp-play-button')[0];
    const recordButton = playButton.cloneNode(true);
    recordButton.id = getButtonID();
    recordButton.setAttribute('title', 'Record');
    recordButton.setAttribute('aria-label', 'Record');

    // Add the record button to the right of the timestamp controls
    playButton.parentElement.appendChild(recordButton);

    // Replace the triangle path with circles...
    const buttonPath = recordButton.getElementsByTagName('svg')[0];
    buttonPath.removeChild(buttonPath.children[1]); // Remove the triangle path
    
    // Add the circle paths
    const circleOuter = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    circleOuter.setAttributeNS(null, 'cx', 15.25);
    circleOuter.setAttributeNS(null, 'cy', 18);
    circleOuter.setAttributeNS(null, 'r', 6);
    circleOuter.setAttributeNS(null, 'style', 'fill: none; stroke: white; stroke-width: 1.5px');
    buttonPath.appendChild(circleOuter);
    
    const circleInner = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    circleInner.setAttributeNS(null, 'cx', 15.25);
    circleInner.setAttributeNS(null, 'cy', 18);
    circleInner.setAttributeNS(null, 'r', 3.5);
    circleInner.setAttributeNS(null, 'style', 'fill: white;');
    buttonPath.appendChild(circleInner);

    // Click handler
    recordButton.onclick = function() {
        const video = recordButton.ownerDocument.getElementsByTagName('video')[0];
        if (video.paused) {
            video.play();
            circleInner.setAttributeNS(null, 'style', 'fill: red;');
        }
        else {
            video.pause();
            circleInner.setAttributeNS(null, 'style', 'fill: white;');
        } 
    }    

}


addPopupControls();
addButton();
