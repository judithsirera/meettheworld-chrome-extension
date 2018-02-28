
var username = "";
var data = "";

$( document ).ready(function () {
	console.log("Ready!");
	data = firebaseManager.initFirebase();


	username = htmlElementsExtractor.getUsername();

	//getFeed
	var feed = htmlElementsExtractor.getFeed();

	//create a button template
	var addBtnTemplate = addButtonManager.getTemplate();

	//detect when new article inserted to document_end
	$( feed ).bind('DOMNodeInserted', function (node) {
		if ($( node.target ).is('article')) {

			//Remove all
			$( addButtonManager.jQueryClass ).remove();

			//get all headers and add button
			var allHeaders = htmlElementsExtractor.getAllHeaders();
			$( allHeaders ).append(addBtnTemplate);

			//delete buttons from headers without Location
			$( allHeaders ).each(function (index){
				if ($($( allHeaders )[index].children[1].children[1].children).length == 0) {
					$($($( allHeaders )[index]).find(addButtonManager.jQueryClass)).remove()
				}
			});

			//add event listener
			$( allHeaders ).find(addButtonManager.jQueryClass).click(addButtonManager.addButtonHandler)
		}
	})

});
