

var instagramManager = {
  username: "",
  //token: '227452265.37ef44c.6aa376f9648144fe8d6f7caf06a92b90',
  token: '227452265.45452c0.84f61d50adbd4984b238cd4f134db60a',
  requestApi: 'https://api.instagram.com/v1/locations/',
  requestToken: "",
  type: "GET",

  requestCoordsFromLocationID: function (locationID) {
    var xhr = new XMLHttpRequest();

    //console.log(this.requestApi + locationID + '?access_token=' + this.token);
    xhr.open(this.type, this.requestApi + locationID + '?access_token=' + this.token)
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        // JSON.parse does not evaluate the attacker's scripts.
        var resp = JSON.parse(xhr.responseText);
        firebaseManager.updateCoordsFirebase(locationID, resp.data.longitude, resp.data.latitude);
      }
    }
    xhr.send();
  }
}
