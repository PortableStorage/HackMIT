(function () {
    "use strict";
    var id = "UNIQUEISH";
    chrome.contextMenus.create({"title": "Hello, world!", id: id, "contexts":["selection"]});
    chrome.contextMenus.onClicked.addListener(function (info, tab) {
        var height = 300;
        chrome.tabs.executeScript(tab.id, {file: "inject.js"}, function(){
            chrome.tabs.sendMessage(tab.id, {type: "highlight"});
        }); 
    });
	
	function handleMessage(message, sender) {
		if (message.type === "panel" || message.type === "selectors") {
			chrome.tabs.sendMessage(sender.tab.id, message);
		} else {
			debugger;
		}
	}
	chrome.runtime.onMessage.addListener(handleMessage);
}())
