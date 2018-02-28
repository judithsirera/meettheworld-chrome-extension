

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

    firebase.database().ref('/users/' + username + '/').once('value').then(function(snapshot) {
      data = snapshot.val();
    });
    return "";
  },

  saveToFirebase: function (locationData) {
    //Save location data:
    if (!data | (data && !Object.keys(data).includes(locationData.locationID))) {
      this.databaseRef.ref('users/' + username).child(locationData.locationID).set({
        name: locationData.location.locationName,
        coord: locationData.location.coord,
      });
    }

    //Save location post:
    this.databaseRef.ref('users/' + username + '/' + locationData.locationID).child(locationData.location.postId).set({
      photographer: locationData.location.post.photographer,
      image: locationData.location.post.image
    })
  },

  deleteFromFirebase: function (locationID, postID) {
    this.databaseRef.ref('users/' + username + '/' + locationID).child(postID).remove();
  }
}
