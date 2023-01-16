// Global Variables
let geoApi = 'AIzaSyC7KptZv_AlWMLmOh6A_AjA_tuc5vJTZ64';
const button = document.getElementById("search");

// Initialize GoogleMaps
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: { lat: 37.7749, lng: -122.4194 }
  });
  return map;
}

function callAPI() {
  // Get user input for animal and zipcode
  let animal = document.querySelector('#pet').value;
  let zip = document.querySelector('#location').value;
  let miles = '50';
  let div = document.createElement('div');
  div.style.border = '1px solid black';
  let petDiv = document.getElementById('currentpet');
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


      // Call the map
      var map = initMap();
      // Create the info window
      var infoWindow = new google.maps.InfoWindow({
      content: `<div>Organization Name</div><div>Address</div>`
      });
      

    
      for (let i = 0; i < data.data.length; i++){
        console.log(data.data[i].attributes);
        //add pictureURL, DescriptionHTML, sex, distance,name to the page
        //use index to push into an array then add locations to the array of objects
        let petImage = data.data[i].attributes.pictureThumbnailUrl;
        let animalName = data.data[i].attributes.name;
        let animalGender = data.data[i].attributes.sex;
        let distance = data.data[i].attributes.distance;
         let description = data.data[i].attributes.descriptionText;
         let locationId = data.data[i].relationships.orgs.data[0].id;
        console.log(description);
       
        //  Call the location API
      callLocation(locationId,petImage,animalName, distance,description,animalGender, function callBack(petLocation){
            // create a marker for each location
              var marker = new google.maps.Marker({
              // icon: {
              //   url: 'paw_print.png',
              //   scaledSize: new google.maps.Size(50, 50)
              // },
              position: petLocation,
              map: map,
              
            });

            // Associate the info window with clicking the marker
            marker.addListener('click', function() {
            infoWindow.open(map, marker);
            });

          });      
         
      }
  });
}


function callLocation(locationId,petImage,animalName, distance,description,animalGender, callBack) {
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
          let phone = location.data[0].attributes.phone
          let street = location.data[0].attributes.street;
          let citystate = location.data[0].attributes.citystate;
          let postalcode = location.data[0].attributes.postalcode;
          let address = street + " " + citystate + " " + postalcode;
          // Check to see if turning into address correctly
          console.log(address);
          let locationDiv = document.createElement('div');
          locationDiv.innerHTML = `
          <div id = 'eachPet'>
          <img src="${petImage}">
          <p>Hi! My name is:<strong> ${animalName}</strong>.
          <br>
          I am a ${animalGender}. 
          <br>
         About me: ${description}
          <br>
          
          I am about ${distance} miles away from you</p>
          <a href="${url}"><em>Click here to Find me!</em></a>
          <p>City and State: ${citystate}</p>
          <p>Postal Code: ${postalcode}</p>
        </div>
          `;
       
          document.querySelector('#petlocation').appendChild(locationDiv);
         
          // Call the google geocode api
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${geoApi}`)
        .then(function (response) {
            return response.json();
            
        })
        .then(function (data) {
          // turn pet address into lat/lon coordinates
          let lat = data.results[0].geometry.location.lat;
          let lng = data.results[0].geometry.location.lng;
          let petLocation = { lat: lat, lng: lng };
          // Make sure pet address is actually converting to lat/lon
          console.log(petLocation);
          callBack(petLocation);
          
      });
         
      });
  }


  // Event listener for search button
  button.addEventListener("click", function() {
    callAPI();
    // Display map on click
    document.getElementById('map').style.display = "block";
  });


