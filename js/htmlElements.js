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

  addButtonHandler: function (event) {
    console.log("post id: " + htmlElementsExtractor.getPostID(event.target));

  	if (!htmlElementsExtractor.getLocation(event.target)) return;

  	console.log("location: " + htmlElementsExtractor.getLocation(event.target));
  	console.log("location ID: " + htmlElementsExtractor.getLocationID(event.target));
  	console.log("photographer: " + htmlElementsExtractor.getPhotographer(event.target));
  	console.log("image: " + htmlElementsExtractor.getImageOrVideo(event.target));

  }
}
