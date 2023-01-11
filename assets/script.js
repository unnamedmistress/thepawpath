
let animal = 'cat';
let zip = '33710'
let miles = '50'

function callAPI() {
  fetch(`https://api.rescuegroups.org/v5/public/animals/search/${animal}s/&sort=-animals.updatedDate `, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/vnd.api+json',
      'Authorization': '4YCyjIun',
    },
    body: JSON.stringify({
      data: {
        'filterRadius': {
          'postalcode': zip,
          'miles': miles
        },
        'filters':[
            {
                'fieldName': 'statuses.name',
                'operation': 'equals',
                'criteria': 'Available'
            }
        ]
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
        let petImage = data.data[i].attributes.pictureThumbnailUrl;
        console.log(petImage);
        let animalDescription = data.data[i].attributes.descriptionText;
        console.log(animalDescription);
        let animalName = data.data[i].attributes.name;
        console.log(animalName);
        let animalGender = data.data[i].attributes.sex;
        console.log(animalGender);
        let distance = data.data[i].attributes.distance;
         console.log(distance);
      }
    });
}

  callAPI();
  let clientId = 'W750HoqDetVYtZcaio7lrtxXBtnpimCWRzkOJBw9BpphKqsBe9';
let clientSecret = 'Ob6WnCJFvLCt9IfrVpQTlxlc2pfu7FCDCk5NR1g9';
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
  

  //fetch(
    //'https://api.github.com/repos/nodejs/node/issues?per_page=10&state=open&sort=created&direction=desc'
  //)
  //  .then(function (response) {
   //   return response.json();
  //  })
  //  .then(function (data) {
    //  console.log(data);
 //   });