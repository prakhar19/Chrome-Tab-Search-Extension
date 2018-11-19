if (typeof iframe !== 'undefined') {

    iframe.style.display = (iframe.style.display == 'block') ? 'none' : 'block';

} else {

    iframe = document.createElement('iframe');
    iframe.src = chrome.extension.getURL('widget.html');

    iframe.style = 'display:block;width:70%;height:300px;position:fixed;top:20%;left:50%;transform:translateX(-50%);border:none;z-index:9999999;';

    document.body.appendChild(iframe);

}

if (iframe.style.display == 'block') {
    iframe.contentWindow.postMessage('tab-search-focus-input', '*');
}


var click1 = function(event) {
    if(event.data == 'tab-search-focus-remove') {
        iframe.style.display = "none";

        window.removeEventListener('message', click1);
        window.removeEventListener('mousedown', click2);
    }
}

var click2 = function(event) {
    if(!iframe.contains(event.target)) {
        iframe.style.display = "none";
        
        window.removeEventListener('message', click1);
        window.removeEventListener('mousedown', click2);
    };
}

window.addEventListener('message', click1);
window.addEventListener('mousedown', click2);