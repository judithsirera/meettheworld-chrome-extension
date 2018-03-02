

var username = "";
var data = "";
var oldHref = "";

addButtonManager.initURL();
firebaseManager.initFirebase();

$( document ).ready(function () {
	username = htmlElementsExtractor.getUsername();

	$('body').bind('DOMSubtreeModified', function () {
		if (window.location.href != oldHref) {
			oldHref = window.location.href;
			firebaseManager.setData();
			var interval = setInterval(function(){
				if (htmlElementsExtractor.isLoaded() && data) {
					clearInterval(interval);
					initApp();
				}
			}, 10);

		}
	})
});


function initApp() {
	console.log("Ready!");

	//getFeed
	var feed = htmlElementsExtractor.getFeed();

	var allHeaders = htmlElementsExtractor.getAllHeaders();

	$('header').each(function (index, value) {
		if ($(value).attr('class') != '_mainc') {
			addButtonManager.appendButton(value);
		}
	})

	//detect when new article inserted to document_end
	$( feed ).bind('DOMNodeInserted', function (node) {
		if ($( node.target ).is('article')) {

			var header = $($(node.target).get(0)).children().get(0);

			addButtonManager.appendButton(header);

		}
	})
}
