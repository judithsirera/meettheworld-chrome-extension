

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

    console.log(this.databaseRef);
  }
}
