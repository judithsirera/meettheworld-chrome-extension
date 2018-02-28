

var instagramManager = {
  token: '227452265.37ef44c.6aa376f9648144fe8d6f7caf06a92b90',
  requestApi: 'https://api.instagram.com/v1/locations/',
  requestToken: "",
  type: "GET",

  requestCoordsFromLocationID: function (locationID) {
    var xhr = new XMLHttpRequest();

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
