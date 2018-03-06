

//var username = "";
var data = "";
var oldHref = "";

addButtonManager.initURL();
firebaseManager.initFirebase();

$( document ).ready(function () {
	instagramManager.username = htmlElementsExtractor.getUsername();
	firebaseManager.setFirebaseUsername(instagramManager.username);

	firebaseManager.setData();

	$('body').bind('DOMSubtreeModified', function () {
		if (window.location.href != oldHref) {
			oldHref = window.location.href;
			firebaseManager.initData();
		}
	})

});

// APP OBJECT
var app = {
	initApp: function () {
		console.log("Ready!");

		//Add button to map
		if ($('.openMap').length == 0){
			$($("._tpnch")[0].children[0]).append($('<div class="_b28md"><a class="openMap" target="_blank" href="http://meettheworld.judithsirera.com/"><img src="' +
													chrome.extension.getURL('images/icon.png') +
													'" height="26" alt=""></a></div>'));
		}


		//getFeed
		var feed = htmlElementsExtractor.getFeed();

		var allHeaders = htmlElementsExtractor.getAllHeaders();

		if (!(window.location.href).includes('/explore/') && !(window.location.href).includes('/stories/')) {
			$(allHeaders).each(function (index, value) {
				if ($(value).attr('class') != '_mainc' && $(value).attr('class') != '_5b1eb' && $(value).attr('class') != '_j5dqo') {
					addButtonManager.appendButton(value);
				}
			})
		}

		//detect when new article inserted to document_end
		$( feed ).bind('DOMNodeInserted', function (node) {
			if ($( node.target ).is('article')) {
				var header = $($(node.target).get(0)).children().get(0);
				addButtonManager.appendButton(header);
			}
		})
	},

	init: function () {
		var interval = setInterval(function(){
			if (htmlElementsExtractor.isLoaded()) {
				clearInterval(interval);
				app.initApp();
			}
		}, 10);
	}
}
