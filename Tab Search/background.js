chrome.commands.onCommand.addListener( function(command) {
    if (command == 'execute_tab_search') {
        
        chrome.tabs.query( {}, function(tabs) {
            console.log(tabs);
        });
        
        chrome.tabs.executeScript({
            file : 'scripts/display-widget.js'
        });

    }
});


chrome.runtime.onMessage.addListener( function (request, sender, sendResponse) {
    
});
