
let zip = document.getElementById('location')
const error = document.querySelector('#error-message');
let animal = document.querySelector('#Pet'); 
// cat';//link animal search to text field
// '33710'//link zip to text field
let miles = '50' //link miles to text field
let searchBtn = document.querySelector('#search');

let div = document.createElement('div')
div.style.border = '1px solid black';
let petDiv = document.getElementById('currentpet')

// Click search button function
function getResults (event) {
  // Get the input value from animal type
  let animalType = animal.value.trim();
  animal.value = "";
  // Get input value from zipcode
  let zipCode = zip.value.trim();
  zip.value = "";
  event.preventDefault();
// Error message if don't input dog/cat
  if (animalType.toLowerCase() !== "dog" && 
  animalType.toLowerCase() !== "cat") {
      errorMessage.innerHTML = "You must search for a dog or cat!";

  } else {
      errorMessage.innerHTML = "";
  }
};
  searchBtn.addEventListener('click', function(getResults){});






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

         let petInfo = `
         <img src="${petImage}">
         <h2>Name: ${animalName}</h2>
         <h3>Gender: ${animalGender}</h3>
         <h3>Distance: ${distance} miles away</h3>
         <h3>Description: ${description}</h3>
     `;
     petDiv.innerHTML += petInfo;
         callLocation(locationId);
         
         
      }
    });
}
let citystate = '';
let postalcode = '';
let street = '';
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

          //add location URL, phone, street, city and zip to the page
          let url = location.data[0].attributes.url;
          let phone = location.data[0].attributes.phone
          street = location.data[0].attributes.street;
          citystate = location.data[0].attributes.citystate;
          postalcode = location.data[0].attributes.postalcode;
          let locationDiv = document.createElement('div');
          locationDiv.innerHTML = `
          <p>URL:"${url}"</p>
          <p>Phone: ${phone}</p>
          <p>Street: ${street}</p>
          <p>City and State: ${citystate}</p>
          <p>Postal Code: ${postalcode}</p>
          <br>
          <br>
          <br>
          <br>
          <br
          `;
       
          document.querySelector('#petlocation').appendChild(locationDiv);
         
          
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

