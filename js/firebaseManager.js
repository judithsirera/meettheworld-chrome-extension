

var firebaseManager = {
  databaseRef: {},

  config: {
    apiKey: "AIzaSyCQKOJcxoH00rBPXxGRoqRiPp6m526AKkU",
    authDomain: "instaplace-c3a25.firebaseapp.com",
    databaseURL: "https://instaplace-c3a25.firebaseio.com",
    projectId: "instaplace-c3a25",
    storageBucket: "instaplace-c3a25.appspot.com",
    messagingSenderId: "49535575943"
  },

  initFirebase: function () {
    firebase.initializeApp(this.config);
    this.databaseRef = firebase.database();

    return "";
  },

  saveToFirebase: function (user, locationData) {
    //Save location data:
    this.databaseRef.ref('users/' + user).child(locationData.locationID).set({
      name: locationData.location.locationName,
      coord: locationData.location.coord,
    });

    //Save location post:
    this.databaseRef.ref('users/' + user + '/' + locationData.locationID).child(locationData.location.postId).set({
      photographer: locationData.location.post.photographer,
      image: locationData.location.post.image
    })
  },

  deleteFromFirebase: function (user, locationID, postID) {
    this.databaseRef.ref('users/' + user + '/' + locationID).child(postID).remove();
  }
}
