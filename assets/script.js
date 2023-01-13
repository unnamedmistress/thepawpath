let animal = 'cat';//link animal search to text field
let zip = '33710'//link zip to text field
let miles = '50' //link miles to text field

function callAPI() {
  fetch(`https://api.rescuegroups.org/v5/public/animals/search/${animal}s&sort=-animals.updatedDate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/vnd.api+json',
      'Authorization': '4YCyjIun',
    },
    body: JSON.stringify({
      data: {
        filterRadius: {
          miles: miles,
          postalcode: zip
        }
      }
    })
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        console.log(data)
      console.log(data.data[0].attributes);
      for (let i = 0; i < data.data.length; i++){
        console.log(data.data[i].attributes);
        //add pictureURL, DescriptionHTML, sex, distance,name to the page
        let petImage = data.data[i].attributes.pictureThumbnailUrl;
        console.log(petImage);
        let animalName = data.data[i].attributes.name;
        console.log(animalName);
        let animalGender = data.data[i].attributes.sex;
        console.log(animalGender);
        let distance = data.data[i].attributes.distance;
         console.log(distance);
         let description = data.data[i].attributes.descriptionHtml;
         console.log(description);
         let locationId = data.data[i].relationships.orgs.data[0].id;
         console.log(locationId);
        
         callLocation(locationId);
        
         
      }
    });
}

function callLocation(locationId) {
    fetch(`https://api.rescuegroups.org/v5/public/orgs/${locationId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/vnd.api+json',
          'Authorization': '4YCyjIun',
        }
})
      .then(function (response) {
        return response.json();
      })
      .then(function (location) {
          console.log(location);

          //add location URL, phone, street, city and zip to the page
          let url = location.data[0].attributes.url;
          console.log(url);
          let phone = location.data[0].attributes.phone
          console.log(phone);
          let street = location.data[0].attributes.street;
          console.log(street);
          let citystate = location.data[0].attributes.citystate;
          console.log(citystate);
          let postalcode = location.data[0].attributes.postalcode;
          console.log(postalcode);

        
      });
  }


  callAPI();

  function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: { lat: 37.7749, lng: -122.4194 }
    });

    for (let i = 0; i < data.data.length; i++) {
        let address = data.data[i].attributes.location;
        let animalName = data.data[i].attributes.name;
        geocodeAddress(locationId, animalName, map);
    }
}

function geocodeAddress(locationId, animalName, map) {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({ 'address': address }, function (results, status) {
      if (status === 'OK') {
          var marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location,
              title: animalName
          });
      } else {
          console.log('Geocode was not successful for the following reason: ' + status);
      }
  });
}

// // Initialize and add the map
// function initMap() {
//   // The location of Uluru
//   const uluru = { lat: -25.344, lng: 131.031 };
//   // The map, centered at Uluru
//   const map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 4,
//     center: uluru,
//   });
//   // The marker, positioned at Uluru
//   const marker = new google.maps.Marker({
//     position: uluru,
//     map: map,
//   });
// }

window.initMap = initMap;
