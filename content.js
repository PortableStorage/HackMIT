(function () {
	window.initialize = function () {
		var pre = document.createElement("pre");
		pre.innerText = window.data.join("\n");
		document.body.appendChild(pre);
	}
}());