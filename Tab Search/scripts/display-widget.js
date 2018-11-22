var iframe;

if(typeof resizeIframe === 'undefined') {
    function resizeIframe(message) {
        if(typeof message.data.resize !== 'undefined') {
            iframe.style.height = (message.data.resize + 5) + 'px';
        }
    }
}


if(typeof lostFocusClick === 'undefined') {
    function lostFocusClick(event) {
        if(!iframe.contains(event.target)) {
            removeIframe();
        };
    }
}

if(typeof lostFocusBlur === 'undefined') {
    function lostFocusBlur() {
        removeIframe();
    }
}

if(typeof lostFocusMessage === 'undefined') {
    function lostFocusMessage(message) {
        if(message.data === 'remove-tab-search') {
            removeIframe();
        }
    }
}


function removeIframe() {
    if(iframe instanceof HTMLElement) {
        iframe.parentNode.removeChild(iframe);
        iframe = null;
    }
    
    window.removeEventListener('message', resizeIframe);

    window.removeEventListener('message', lostFocusMessage);
    document.removeEventListener('mousedown', lostFocusClick);
    document.removeEventListener('visibilitychange', lostFocusBlur);
}


if(iframe instanceof HTMLIFrameElement) {

    removeIframe();

} else {

    iframe = document.createElement('iframe');
    iframe.src = chrome.extension.getURL('widget.html');

    iframe.style = 'display:block;width:75%;height:300px;position:fixed;top:20%;left:50%;transform:translateX(-50%);border:none;z-index:9999999;';

    document.body.appendChild(iframe);

    
    window.addEventListener('message', resizeIframe);

    window.addEventListener('message', lostFocusMessage);
    document.addEventListener('mousedown', lostFocusClick);
    document.addEventListener('visibilitychange', lostFocusBlur);
    //window.addEventListener('blur', lostFocusBlur);
}