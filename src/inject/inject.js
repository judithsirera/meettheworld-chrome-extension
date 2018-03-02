
var username = "";
var data = "";
var oldHref = "";

addButtonManager.initURL();
firebaseManager.initFirebase();

$( document ).ready(function () {

	$('body').bind('DOMSubtreeModified', function () {
		if (window.location.href != oldHref) {
			oldHref = window.location.href;
			firebaseManager.setData();
			var interval = setInterval(function(){
				if (htmlElementsExtractor.isLoaded()) {
					clearInterval(interval);
					initApp();
				}
			}, 10);

		}
	})
});


function initApp() {
	console.log("Ready!");
	console.log(data);

	username = htmlElementsExtractor.getUsername();

	if (data) {
		data = data[username];
	}

	//getFeed
	var feed = htmlElementsExtractor.getFeed();

	var allHeaders = htmlElementsExtractor.getAllHeaders();
	$('header').each(function (index, value) {
		addButtonManager.appendButton(value);
	})

	//detect when new article inserted to document_end
	$( feed ).bind('DOMNodeInserted', function (node) {
		if ($( node.target ).is('article')) {

			var header = $($(node.target).get(0)).children().get(0);

			addButtonManager.appendButton(header);

		}
	})
}
