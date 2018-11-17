if (typeof iframe !== 'undefined') {

    iframe.style.display = (iframe.style.display == 'block') ? 'none' : 'block';

} else {

    iframe = document.createElement('iframe');
    iframe.src = chrome.extension.getURL('widget.html');

    iframe.style = 'display:block;width:70%;height:35%;max-height:350px;position:fixed;top:20%;left:50%;transform:translateX(-50%);';

    document.body.appendChild(iframe);

}

if(!focus_input) function focus_input() {
    console.log(iframe.contentWindow.readyState);
    if (iframe.readyState == 'complete') {
        console.log('a');
        iframe.content.postMessage('focus-input', '*');
        return;
    }

    window.setTimeout(focus_input, 10);
}

if (iframe.style.display == 'block') {
    focus_input();
}

var click = function(event) {
    if(!iframe.contains(event.target)) {
        iframe.style.display = "none";
    };

    document.body.removeEventListener('mousedown', click);
}
    
document.body.addEventListener('mousedown', click);
