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
  jQueryClass: ".addToTheMap",
  btnClass: "addToTheMap",

  getTemplate: function () {
    //Create button model
    var button = document.createElement("h1");
    $(button).addClass(this.btnClass).html("add");

    return button;
  },

  buttonHandler: function (event) {

  	if (!htmlElementsExtractor.getLocation(event.target)) return;

    //Prepare data
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

    //Save data
    firebaseManager.saveToFirebase(locationData);
  }
}
