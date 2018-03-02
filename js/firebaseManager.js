

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

  setData: function () {
    firebase.database().ref('/users/' + username + '/').once('value').then(function(snapshot) {
      data = snapshot.val();
    });
  },

  initFirebase: function () {
    firebase.initializeApp(this.config);
    this.databaseRef = firebase.database();

    this.setData()
  },

  saveToFirebase: function (locationData) {
    if (!data | (data && !Object.keys(data).includes(locationData.locationID))) {
      this.databaseRef.ref('users').child(username).child(locationData.locationID).set({
        name: locationData.location.locationName,
        coord: locationData.location.coord,
        posts: '',
      })
      instagramManager.requestCoordsFromLocationID(locationData.locationID);
    }

    //Save location post:
    this.databaseRef.ref('users').child(username).child(locationData.locationID).child('posts').child(locationData.location.postId).set({
      photographer: locationData.location.post.photographer,
      image: locationData.location.post.image
    })

  },

  updateCoordsFirebase: function (locationID, longitude, latitude) {
    this.databaseRef.ref('users').child(username).child(locationID).child('coord').set({
      latitude: latitude,
      longitude: longitude
    })
  },

  deleteFromFirebase: function (locationID, postID) {

    if (data[locationID].posts[postID] && Object.keys(data[locationID].posts).length <= 1) {
      this.databaseRef.ref('users').child(username).child(locationID).remove();
    } else {
      this.databaseRef.ref('users').child(username).child(locationID).child('posts').child(postID).remove();
    }

  }
}
