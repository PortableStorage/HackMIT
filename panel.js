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
	
	chrome.runtime.onMessage.addListener(handleMessage);
	
	$(".choices").html("sdfsdf");
	chrome.runtime.sendMessage(null, {
		type: "panel"
	});
});