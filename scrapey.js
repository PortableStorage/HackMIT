(function () {
    "use strict";
    var id = "UNIQUEISH";
    chrome.contextMenus.create({"title": "Hello, world!", id: id, "contexts":["selection"]});
    chrome.contextMenus.onClicked.addListener(function () {
        alert("Hello! Alert!"); 
    }); 
}())
