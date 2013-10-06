$(function () {
	var template = Mustache.compile($("#main-template").text());
	function handleMessage(message) {
		if (message.type === "selectors") {
			var context = {
				selectors: message.selectors.map(function (name) {
					return {
						name: name
					};
				})
			};
			
			$("#main").html(template(context));
		}
	}
	
	$("#main").on("change", ".selector-checkbox", function () {
		chrome.runtime.sendMessage(null, {
			type: "checkboxes",
			classes: $(".selector-checkbox:checked").toArray().map(function (element) {
				return $(element).data("selectorName");
			})
		});
	});
	
	chrome.runtime.onMessage.addListener(handleMessage);
	
	chrome.runtime.sendMessage(null, {
		type: "panel"
	});
});