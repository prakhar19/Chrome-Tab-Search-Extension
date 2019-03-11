/*

Author: Prakhar Agarwal
Github: https://github.com/prakhar19/

Icon Source: https://www.flaticon.com/
<div>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
*/


chrome.commands.onCommand.addListener( function(command) {
    if (command == 'execute_tab_search') {
        
        chrome.tabs.executeScript({
            file : 'scripts/display-widget.js'
        });

    }
});


chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    var searchTerm = (request.searchTerm + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
    var switchTab = request.switchTab;
    
    if(switchTab !== undefined) {
        
        chrome.tabs.get(switchTab, function(tab) {
            chrome.windows.update(tab.windowId, {focused: true});
            chrome.tabs.update(Number(switchTab), {active: true});
        });

    } else {
        
        var matches = [[], [], [], [], [], []], output = [];
        
        if(searchTerm === '') {
            sendResponse({tabs: output});
            return;
        }
    
        tabsList = chrome.tabs.query({}, function(tabs) {
    
            for (var i = 0; i < tabs.length; i++) {
                var pos = tabs[i].title.toLowerCase().search(searchTerm.toLowerCase());
                if (pos == 0) {
                    matches[0].push(tabs[i]);
                    continue;
                } else if (pos > 0) {
                    matches[1].push(tabs[i]);
                    continue;
                }
                
                var pos = new URL(tabs[i].url).hostname.toLowerCase().search(searchTerm.toLowerCase());
                if (pos == 0) {
                    matches[2].push(tabs[i]);
                    continue;
                } else if (pos > 0) {
                    matches[3].push(tabs[i]);
                    continue;
                }
    
                var pos = tabs[i].url.toLowerCase().search(searchTerm.toLowerCase());
                if (pos == 0) {
                    matches[4].push(tabs[i]);
                    continue;
                } else if (pos > 0) {
                    matches[5].push(tabs[i]);
                    continue;
                }
            }
    
            for (var i = 0; i < matches.length; i++) {
                for (var j = 0; j < matches[i].length; j++) {
                    output.push([matches[i][j].id, matches[i][j].title, matches[i][j].url, matches[i][j].favIconUrl]);
                    //if(output.length >= 20) break;
                }
                //if(output.length >= 20) break;
            }
    
            sendResponse({tabs: output});
        });
    
        return true;
    }

});

