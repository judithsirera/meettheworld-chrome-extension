
var username = "";

chrome.extension.sendMessage({greetings: "hud"}, function (response) {
	var readyStateCheckInterval = setInterval(function () {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			//insertScripts();

			// ----------------------------------------------------------
			// This part of the script triggers when page is done loading
			console.log("Hello " + username);
			// ----------------------------------------------------------

			//Access to the parent of the header
			var feed = htmlElementsExtractor.getFeed();

			//Create button model
			// var addToTheMapBTN = document.createElement("h1");
			// $(addToTheMapBTN).addClass("addToTheMap").html("add");
			var addToTheMapBTN = addButtonManager.createAddButton();

			//Detect when new pic inserted
			$(feed).bind('DOMNodeInserted', function (newNode) {
				//Detect when is article and add button
				if ($(newNode.target).is('article')) {

					//Remove previous
					$(addButtonManager.jQueryClass).remove()

					//Get all headers
					headers = htmlElementsExtractor.getAllHeaders();
					$(headers).append(addToTheMapBTN)

					//Remove the ones they don't have location
					$(headers).each(function (index){
						if ($($(headers)[index].children[1].children[1].children).length == 0) {
							$($($(headers)[index]).find(addButtonManager.jQueryClass)).remove()
						}
					});

					//add event listener
					$(headers).find(addButtonManager.jQueryClass).click(addButtonManager.addButtonHandler)

				}
			})
		}
	}, 10);
});

// console.log("halooooooo");
// $( document ).ready(function() {
//
// 	var config = {
// 	  apiKey: "AIzaSyCQKOJcxoH00rBPXxGRoqRiPp6m526AKkU",
// 	  authDomain: "instaplace-c3a25.firebaseapp.com",
// 	  databaseURL: "https://instaplace-c3a25.firebaseio.com",
// 	  projectId: "instaplace-c3a25",
// 	  storageBucket: "instaplace-c3a25.appspot.com",
// 	  messagingSenderId: "49535575943"
// 	};
//
// 	firebase.initializeApp(config);
//
// 	console.log(firebase);
//
//     username = htmlElementsExtractor.getUsername();
//
// 		//Access to the parent of the header
// 		var feed = htmlElementsExtractor.getFeed();
//
// 		var addButtonModel = addButtonManager.createAddButton();
//
// 		$( feed ).bind('DOMNodeInserted', function (node) {
// 			//CHECK IF IS ARTICLE
// 			if ($(node.target).is('article')) {
//
// 				var header = $(node.target)[0].children[0];
// 				header.append(addButtonModel);
//
//
// 				var allHeaders = htmlElementsExtractor.getAllHeaders();
// 				$(allHeaders).each(function (index) {
// 					//console.log("all header: ", $(allHeaders)[index]);
// 					//console.log("header ", $(header)[0]);
//
// 					if ($(allHeaders)[index] == $(header)[0]) {
// 						$($(allHeaders)[index]).append(addButtonModel);
// 						console.log($($(allHeaders)[index]));
// 					}
// 				});
//
// 				//Remove previous
// 				/*console.log($(addButtonManager.btnClass));
// 				$('.addToTheMap').remove();
// 				console.log("delete: ", $(addButtonManager.btnClass));
//
// 				//Get all headers
// 				var headers = htmlElementsExtractor.getAllHeaders();
// 				$(headers).append(addButtonModel);
//
// 				//Remove the ones they don't have Location
// 				$(headers).each(function (index){
// 					if ($($(headers)[index].children[1].children[1].children).length == 0) {
// 						$($($(headers)[index]).find(addButtonManager.btnClass)).remove();
// 					}
// 				});
//
// 				//add event listener
// 				$(headers).find('h1').click(addButtonManager.addButtonHandler)*/
//
// 			}
// 		})
//
// });

function addButtonHandler (event) {
	console.log("post id: " + htmlElementsExtractor.getPostID(event.target));

	if (htmlElementsExtractor.getLocation(event.target)) return;

	console.log("location: " + htmlElementsExtractor.getLocation(event.target));
	console.log("location ID: " + htmlElementsExtractor.getLocationID(event.target));
	console.log("photographer: " + htmlElementsExtractor.getPhotographer(event.target));
	console.log("image: " + htmlElementsExtractor.getImageOrVideo(event.target));

}

function insertScripts() {
	var script = document.createElement('script');
	script.src = 'https://www.gstatic.com/firebasejs/4.10.1/firebase.js';
	script.onload = function() {
		console.log("first loaded");
		var s = document.createElement('script');
		s.src = chrome.extension.getURL('js/firebaseManager.js');
		s.onload = function() {
				console.log("loaded second");
				console.log(database);
		};
		document.getElementsByTagName('body')[0].appendChild(s);
	}
	document.getElementsByTagName('body')[0].appendChild(script);
}

function saveDataToFirebase(username, location) {
	console.log("save");
}
