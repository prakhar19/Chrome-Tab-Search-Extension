var iframe;

if(typeof(lostFocus1) === 'undefined') {
    function lostFocus1(event) {
        if(event.data == 'tab-search-focus-remove') {
            removeIframe();
        }
    }
}

if(typeof(lostFocus2) === 'undefined') {
    function lostFocus2(event) {
        if(!iframe.contains(event.target)) {
            removeIframe();
        };
    }
}


function removeIframe() {
    iframe.parentNode.removeChild(iframe);
    iframe = null;
    window.removeEventListener('message', lostFocus1);
    document.removeEventListener('mousedown', lostFocus2);
}


if(iframe instanceof HTMLIFrameElement) {

    removeIframe();

} else {

    iframe = document.createElement('iframe');
    iframe.src = chrome.extension.getURL('widget.html');

    iframe.style = 'display:block;width:70%;height:300px;position:fixed;top:20%;left:50%;transform:translateX(-50%);border:none;z-index:9999999;';

    document.body.appendChild(iframe);

    
    window.addEventListener('message', lostFocus1);
    document.addEventListener('mousedown', lostFocus2);
}