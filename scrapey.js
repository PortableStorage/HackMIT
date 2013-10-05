(function () {
    "use strict";
    var id = "UNIQUEISH";
    chrome.contextMenus.create({"title": "Hello, world!", id: id, "contexts":["selection"]});
    chrome.contextMenus.onClicked.addListener(function (info, tab) {
        var height = 300; 
        chrome.windows.get(tab.windowId, null, function (wind) {
        chrome.windows.create({
            "url":"Panel.html",
            "type":"popup",
            "height": height, 
            "top": wind.top + wind.height - height,
            "left": wind.left, 
            "width": wind.width 
            });
            })
    }); 
}())
