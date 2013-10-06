(function () {
    /* We need to take CSS selectors from our mouse selection */ 
	"use strict";
	
    function selectionSelectors() {
        var selObj = window.getSelection();
        var range  = selObj.getRangeAt(0);
        var closestElement = range.startContainer.parentNode;
        var arrayOfClasses = new Array();    
        while(!hasClass(closestElement)) {
            // TODO: what if there are no classes anywhere, infinite loop?
            closestElement = closestNode.parentElement;
        }
        
        return Array.prototype.slice.call(closestElement.classList);
    }

    function hasClass(node) {
		return node.classList.length > 0;
    }

    function highlightFieldsWithClass(arrayOfClasses) {
        for (var i=0; i < arrayOfClasses.length; i++) {
			var elements = document.getElementsByClassName(arrayOfClasses[i]);
			for (var j=0; j < elements.length; j++) {
				var element = elements[j];
				element.style.backgroundColor = "blue";
			}
        }
		
    }
    
    function handleMessage(message) {
		if (message.type === "highlight") {
			var ss = selectionSelectors();
			selectorMessageWhenReady({"type":"selectors","selectors":ss });
			highlightFieldsWithClass(ss);
		} else if (message.type === "panel") {
			onFrameReady();
		}
    }
	
	var messages = [];
	var isFrameReady = false;
	function selectorMessageWhenReady(message) {
		if (!isFrameReady) {
			messages.push(message);
			return;
		}
		sendSelectorMessage(message);
	}
	
	function sendSelectorMessage(message) {
		chrome.runtime.sendMessage(null, message);
	}
	
	function onFrameReady() {
		for (var i=0; i<messages.length; i++) {
			sendSelectorMessage(messages[i]);
		}
		isFrameReady = true;
	}

	function initialize() {
		if (window.alreadyScraping) {
            return;
        }
		window.alreadyScraping = true;
		var body = document.getElementsByTagName("body")[0]; 
        var frameDiv = document.createElement("div"); 
        frameDiv.style.position = "fixed";
        frameDiv.style.backgroundColor = "blue";
        frameDiv.style.bottom = 0; 
        frameDiv.style.height = "100px"; 
        frameDiv.style.width = "500px";
        frameDiv.innerHTML = '<iframe src="' + chrome.extension.getURL("Panel.html") + '"/>'; 
            
        frameDiv.className = "injected" 
        body.appendChild(frameDiv);
        chrome.runtime.onMessage.addListener(handleMessage);
	}
	
    function ensureJQuery() {

        /*if(!window.jQuery) { 
            var jq = document.createElement('script');
            jq.src = "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";
        
            document.getElementsByTagName('head')[0].appendChild(jq);
            // ... give time for script to load, then type.
            // if no jQuery object this causes error:
            //jQuery.noConflict();
			jq.onload = initialize();
        } else {
			initialize();
		}*/
    }

    initialize();
}()); 
