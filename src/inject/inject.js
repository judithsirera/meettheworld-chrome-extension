chrome.extension.sendMessage({}, function (response) {
	var readyStateCheckInterval = setInterval(function () {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			// ----------------------------------------------------------
			// This part of the script triggers when page is done loading
			console.log("Hello. This message was sent from scripts/inject.js");
			// ----------------------------------------------------------

			//Access to the parent of the header		
			var feed = $('body')[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0];

			//Create button model
			var addToTheMapBTN = document.createElement("h1");
			$(addToTheMapBTN).addClass("addToTheMap").html("add");

			//Detect when new pic inserted
			$(feed).bind('DOMNodeInserted', function (newNode) {
				//Detect when is article and add button
				if ($(newNode.target).is('article')) {

					//Remove previous
					$(".addToTheMap").remove()

					//Get all headers
					headers = document.getElementsByTagName("header")
					$(headers).append(addToTheMapBTN)

					//Remove the ones they don't have location
					$(headers).each(function (index){
						if ($($(headers)[index].children[1].children[1].children).length == 0) {
							$($($(headers)[index]).find(".addToTheMap")).remove()
						}
					});

					//add event listener
					$(headers).find('h1').click(addToMapFunction)

				}
			})

		}
	}, 10);
});


function addToMapFunction(event) {
	var header = $(event.target)[0].parentNode
	var location = $($(header)[0].children[1].children[1].children[0]).attr("title")

	//check if there's location location
	if (!location) return;

	var article = $(header)[0].parentNode
	var photographer = $($(header)[0].children[1].children[0].children[0].children[0]).attr("title")
	var image = $($($(article)[0].children[1]).find('img')[0]).attr("src")

	console.log("location: " + location);
	console.log("photographer: " + photographer);
	console.log("image: " + image);
	

}
