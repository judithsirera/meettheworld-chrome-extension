
var username = "";
var data = "";

firebaseManager.initFirebase();

$( document ).ready(function () {
	console.log("Ready!");

	username = htmlElementsExtractor.getUsername();

	if (data) {
		data = data[username];
	}

	//getFeed
	var feed = htmlElementsExtractor.getFeed();

	//create a button template
	var addBtnTemplate = addButtonManager.getTemplate();

	//detect when new article inserted to document_end
	$( feed ).bind('DOMNodeInserted', function (node) {
		if ($( node.target ).is('article')) {

			//Remove all
			$( addButtonManager.jQueryClassFormat ).remove();

			//get all headers and add button
			var allHeaders = htmlElementsExtractor.getAllHeaders();
			$( allHeaders ).append(addBtnTemplate);

			//delete buttons from headers without Location
			$( allHeaders ).each(function (index){
				if ($($( allHeaders )[index].children[1].children[1].children).length == 0) {
					$($($( allHeaders )[index]).find(addButtonManager.jQueryClassFormat)).remove()
				}
			});

			//change action from posts already saved
			$( addButtonManager.jQueryClassFormat ).each(function (index, value) {

				if (!data) {
					return;
				}

				var locationID = htmlElementsExtractor.getLocationID(value);
				var postID = htmlElementsExtractor.getPostID(value);

				if (Object.keys(data).includes(locationID)) {
					if (data[locationID].posts) {
						if (Object.keys(data[locationID].posts).includes(postID)) {
							//$(value).html('del').attr(addButtonManager._ACTION, addButtonManager._DELETE);
						}
					}
				}
			})


			//add event listener
			$( allHeaders ).find(addButtonManager.jQueryClassFormat).click(addButtonManager.buttonHandler)
		}
	})

});
