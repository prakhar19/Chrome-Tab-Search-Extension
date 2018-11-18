chrome.commands.onCommand.addListener( function(command) {
    if (command == 'execute_tab_search') {
        
        chrome.tabs.executeScript({
            file : 'scripts/display-widget.js'
        });

    }
});


chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    var searchTerm = request.searchTerm;

    tabsList = chrome.tabs.query({}, function(tabs) {
        console.log(tabs);
        var matches = [[], [], [], [], [], []], output = [];

        for (var i = 0; i < tabs.length; i++) {
            var pos = tabs[i].title.search(searchTerm);
            if (pos == 0) {
                matches[0].push(tabs[i]);
                continue;
            } else if (pos > 0) {
                matches[1].push(tabs[i]);
                continue;
            }
            
            var pos = new URL(tabs[i].url).hostname.search(searchTerm);
            if (pos == 0) {
                matches[2].push(tabs[i]);
                continue;
            } else if (pos > 0) {
                matches[3].push(tabs[i]);
                continue;
            }

            var pos = tabs[i].url.search(searchTerm);
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
                output.push([matches[i][j].title, matches[i][j].url]);
            }
        }

        //console.log(output);

        sendResponse({tabs: "as"});

        return true;
    });

});

