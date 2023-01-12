let clientId = 'W750HoqDetVYtZcaio7lrtxXBtnpimCWRzkOJBw9BpphKqsBe9';
let clientSecret = 'Ob6WnCJFvLCt9IfrVpQTlxlc2pfu7FCDCk5NR1g9';
let token;


// Get OAuth token
const getOAuth = function() {
  return fetch('https://api.petfinder.com/v2/oauth2/token', {
      method: 'POST',
      body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      }
  }).then(function(response) {
      return response.json();
  }).then(function(data) {
    console.log(data);
      // Store token data
      token = data.access_token;
      tokenType = data.token_type;
      expires = new Date().getTime() + (data.expires_in * 1000);

      getApi(token);
    });
};

// Make call if token expired
const makeCall = () => {
  // If current token is invalid, get a new one
  if (!expires || expires - new Date().getTime() < 1) {
      getOAuth().then(function() {
          // use access token
      });
  }
};
 getOAuth();

 function getApi(apiToken){
  console.log(apiToken);
  fetch(`https://api.petfinder.com/v2/animals?client_id=${clientId}&client_secret=${clientSecret}&type=dog&page=2`, {
    method: 'GET',
    // mode: 'no-cors',
    headers: {
      'Content-Type':'application/json',
      'Authorization': `Bearer ${apiToken}`
    }
  })
  .then(function(response) {
    return response.json()
    // console.log(response);
  })
  .then(function (data) {
    console.log(data);
  });
}
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


 
