(function () {
    "use strict";
    var id = "UNIQUEISH";
    chrome.contextMenus.create({"title": "Hello, world!", id: id, "contexts":["selection"]});
    chrome.contextMenus.onClicked.addListener(function (info, tab) {
        var height = 300;
		chrome.tabs.insertCSS(tab.id, {file: "inject.css"});
        chrome.tabs.executeScript(tab.id, {file: "inject.js"}, function(){
            chrome.tabs.sendMessage(tab.id, {type: "highlight"});
        }); 
    });
	
	function handleMessage(message, sender) {
		if (message.type === "panel" || message.type === "selectors" || message.type === "checkboxes" || message.type === "start-save") {
			chrome.tabs.sendMessage(sender.tab.id, message);
		} else if (message.type === "save") {
			var child = window.open("content.html", "mywin", "");
			
			child.onload = function () {
				child.data = message.data;
				child.initialize();
			};
		} else {
			debugger;
		}
	}
	chrome.runtime.onMessage.addListener(handleMessage);
}())
