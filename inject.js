(function () {
    var body = document.getElementsByTagName("body")[0]; 
    var frameDiv = document.createElement("div"); 
    frameDiv.style.position = "fixed";
    frameDiv.style.backgroundColor = "blue";
    frameDiv.style.bottom = 0; 
    frameDiv.style.height = "100px"; 
    frameDiv.style.width = "500px";
	debugger;
    frameDiv.innerHTML = '<iframe src="' + chrome.extension.getURL("Panel.html") + '"/>'; 
	
    frameDiv.className = "injected" 
    body.appendChild(frameDiv);
}()); 
