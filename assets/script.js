let animal = 'cat';//link animal search to text field
let zip = '33710'//link zip to text field
let miles = '50' //link miles to text field
let div = document.createElement('div')
div.style.border = '1px solid black';
let petDiv = document.getElementById('currentpet')

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
      
    
      for (let i = 0; i < data.data.length; i++){
        console.log(data.data[i].attributes);
        //add pictureURL, DescriptionHTML, sex, distance,name to the page
        //use index to push into an array then add locations to the array of objects
        let petImage = data.data[i].attributes.pictureThumbnailUrl;
        let animalName = data.data[i].attributes.name;
        let animalGender = data.data[i].attributes.sex;
        let distance = data.data[i].attributes.distance;
         let description = data.data[i].attributes.descriptionHtml;
         let locationId = data.data[i].relationships.orgs.data[0].id;

         callLocation(locationId,petImage,animalName, distance,description,animalGender);
         
         
      }
    });
}
let citystate = '';
let postalcode = '';
let street = '';
function callLocation(locationId,petImage,animalName, distance,description,animalGender) {
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

          //add location URL, phone, street, city and zip to the page
          let url = location.data[0].attributes.url;
          let phone = location.data[0].attributes.phone
          street = location.data[0].attributes.street;
          citystate = location.data[0].attributes.citystate;
          postalcode = location.data[0].attributes.postalcode;
          let locationDiv = document.createElement('div');
          locationDiv.innerHTML = `
          <img src="${petImage}">
          <p>Hi! My name is:<strong> ${animalName}</strong>. 
          I am a ${animalGender}. 
          Here is what some humans say about me:${description}
          I am about ${distance} miles away from you</p>
          <a href="${url}"> Click here to Find me!</a>
          <p>City and State: ${citystate}</p>
          <p>Postal Code: ${postalcode}</p>
        
          `;
       
          document.querySelector('#petlocation').appendChild(locationDiv);
         
          initMap(data)
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

// need to fix markers
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

