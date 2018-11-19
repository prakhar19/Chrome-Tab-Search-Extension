var active_li = null, tab_search_input, tab_search_results;


window.addEventListener('message', function(event) {
    if(event.data == 'tab-search-focus-input') {
        document.getElementById('tab-search-input').focus();
    }
});

function switchTabs(tabId) {
    chrome.runtime.sendMessage({switchTab: Number(tabId)});
}

window.onload = function() {
    tab_search_input = document.getElementById('tab-search-input');
    tab_search_results = document.getElementById('tab-search-results');

    tab_search_input.focus();

    tab_search_input.addEventListener('input', function(event) {
        active_li = null;

        chrome.runtime.sendMessage({searchTerm: tab_search_input.value}, function(response) {
            console.log(response);

            tab_search_results.innerHTML = '';

            for (var i = 0; i < response.tabs.length; i++) {
                var li = document.createElement('li');
                li.id = response.tabs[i][0];
                li.tabIndex = -1;
                li.innerHTML = '<span class="tab-search-result-title">' + response.tabs[i][1] + '</span><span class="tab-search-result-url">' + response.tabs[i][2] + '</span>';
                
                li.onclick = function() {switchTabs(this.id);};

                tab_search_results.appendChild(li);
            }
        });
    });

    window.addEventListener('mousedown', function (event) {
        if (!tab_search_input.contains(event.target) && !tab_search_results.contains(event.target)) {
            parent.postMessage('tab-search-focus-remove', '*');
        }
    });

    

    document.onkeydown = keyboardEvents;

    function keyboardEvents(e) {
        var key = (window.event) ? event.keyCode : e.keyCode;

        switch (key) {
            case 40:
                e.preventDefault();
                if(!(active_li instanceof Element)) {
                    active_li = document.getElementById('tab-search-results').childNodes[0];
                } else if(!(active_li.nextSibling instanceof Element)) {
                    return;
                } else {
                    active_li = active_li.nextSibling;
                }
                break;
            case 38:
                e.preventDefault();
                if(!(active_li instanceof Element)) {
                    return;
                } else if(tab_search_results.contains(active_li) && !(active_li.previousSibling instanceof Element)) {
                    tab_search_input.focus();
                }
                active_li = active_li.previousSibling;
                break;
            case 13:
                activeElement = document.activeElement;
                if(tab_search_results.contains(activeElement)) {
                    activeElement.click();
                }
                break;
            default:
                tab_search_input.focus();
                return;
        }
        
        if(active_li instanceof Element) {
            active_li.focus();
        }
    };
}
