

var htmlElementsExtractor = {
	getUsername: function () {
		return $(".coreSpriteDesktopNavProfile").attr('href').split('/')[1];
	},

  getFeed: function () {
    return $('body')[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0];
  },

  getAllHeaders: function () {
    return document.getElementsByTagName("header");
  },

	getHeader: function (fromButton) {
		return $(fromButton)[0].parentNode;
	},

	getLocation: function (fromButton) {
		var header = this.getHeader(fromButton);
		return $($(header)[0].children[1].children[1].children[0]).attr("title");
	},

	getLocationID: function (fromButton) {
		var header = this.getHeader(fromButton);
		return $($(header)[0].children[1].children[1].children[0]).attr("href").split('/')[3];
	},

	getArticle: function (fromButton) {
		var header = this.getHeader(fromButton);
		return $(header)[0].parentNode;
	},

	getPhotographer: function (fromButton) {
		var header = this.getHeader(fromButton);
		return $($(header)[0].children[1].children[0].children[0].children[0]).attr("title");
	},

	getPostID: function (fromButton) {
		var article = this.getArticle(fromButton);
		return $($($(article)[0]).find('time')[0].parentNode).attr("href").split('/')[2];
	},

	getImageOrVideo: function (fromButton) {
		var article = this.getArticle(fromButton);
		var source = $($($(article)[0].children[1]).find('img')[0]).attr("src");

		if (!source) {
			source = $($($(article)[0].children[1]).find('video')[0]).attr("src");
		}
		return source;
	},
}


var addButtonManager = {
	_DELETE : "DELETE",
	_ADD: "ADD",
	_ACTION: "action",
	addURL: "images/icon_add.png",
	deleteURL: "images/icon_delete.png",
	addSrc: "",
	deleteSrc: "",
	jQueryClassFormat: ".addToTheMap",
  btnClass: "addToTheMap",

	initURL: function () {
		this.addSrc = chrome.extension.getURL(this.addURL);
		this.deleteSrc = chrome.extension.getURL(this.deleteURL);
	},

  getAddTemplate: function () {
    //Create button model
    var button = document.createElement("img");
		button.src = this.addSrc;
    $(button).addClass(this.btnClass).attr("action", this._ADD);

    return button;
  },

	getDeleteTemplate: function () {
    //Create button model
    var button = document.createElement("img");
		button.src = this.deleteSrc;
    $(button).addClass(this.btnClass).attr("action", this._DELETE);

    return button;
  },

	getLocationObject: function (event) {
		var locationData = {
	    locationID: htmlElementsExtractor.getLocationID(event.target),
	    location: {
	      locationName: htmlElementsExtractor.getLocation(event.target),
	      coord: {
	        latitude: "",
	        longitude: "",
	      },
	      postId: htmlElementsExtractor.getPostID(event.target),
	      post: {
	        photographer: htmlElementsExtractor.getPhotographer(event.target),
	        image: htmlElementsExtractor.getImageOrVideo(event.target)
	      }
	    }
		}

		return locationData;
	},

	changeToAdd: function (button) {
		button.src = this.addSrc;
		$( button ).attr(this._ACTION, this._ADD);
	},

	changeToDelete: function (button) {
		button.src = this.deleteSrc;
		$( button ).attr(this._ACTION, this._DELETE);
	},

  buttonHandler: function (event) {
  	if (!htmlElementsExtractor.getLocation(event.target)) return;
    //Prepare data
    var locationData = addButtonManager.getLocationObject(event);

		if ($( event.target ).attr(addButtonManager._ACTION) == addButtonManager._ADD) {
			//ADD TO DATABASE
			firebaseManager.saveToFirebase(locationData);
			addButtonManager.changeToDelete(event.target);
			//$( event.target ).html('del').attr(addButtonManager._ACTION, addButtonManager._DELETE);
		} else if ($( event.target ).attr(addButtonManager._ACTION) == addButtonManager._DELETE) {
			//DELETE FROM DATABASE
			firebaseManager.deleteFromFirebase(locationData.locationID, locationData.location.postId);
			addButtonManager.changeToAdd(event.target);
			//$( event.target ).html('add').attr(addButtonManager._ACTION, addButtonManager._ADD);
		}

		firebaseManager.setData();
  },

	appendButton: function (header) {
		if ($($(header)[0].children[1].children[1])[0].childElementCount > 0) {

			var button = this.getAddTemplate();

			if (data) {
				var locationID = $($(header)[0].children[1].children[1].children[0]).attr("href").split('/')[3];
				var article = $(header)[0].parentNode;
				var postID = $($($(article)[0]).find('time')[0].parentNode).attr("href").split('/')[2];

				if (data[locationID]) {
					if (data[locationID].posts) {
						if(data[locationID].posts[postID]) {
							button = this.getDeleteTemplate();
						}
					}
				}
			}

			header.appendChild(button);

			$( button ).click(this.buttonHandler);
		}
	}
}
