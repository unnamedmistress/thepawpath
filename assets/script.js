
let animal = 'cat';//link animal search to text field
let zip = '33710'//link zip to text field
let miles = '50' //link miles to text field
let div = document.createElement('div')
div.style.border = '1px solid black';

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

          //add location URL, phone, street, city and zip to the page
          let url = location.data[0].attributes.url;
          let phone = location.data[0].attributes.phone
          let street = location.data[0].attributes.street;
          let citystate = location.data[0].attributes.citystate;
          let postalcode = location.data[0].attributes.postalcode;
          console.log(postalcode);

        
      });
  }


  callAPI();


 
