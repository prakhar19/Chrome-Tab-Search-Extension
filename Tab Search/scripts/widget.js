
window.addEventListener('message', function(event) {
    if(event.data == 'focus-input') {
        document.getElementById('tab-search-input').focus();
    }
});

window.onload = function() {
    tab_search_input = document.getElementById('tab-search-input');

    tab_search_input.focus();

    tab_search_input.addEventListener('input', function(event) {
        chrome.runtime.sendMessage({searchTerm: tab_search_input.value}, function(response) {
            console.log(response);
        });
    });

}
