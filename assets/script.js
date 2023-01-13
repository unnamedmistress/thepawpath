
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
      
    
      for (let i = 0; i < data.data.length; i++){
       
        //add pictureURL, DescriptionHTML, sex, distance,name to the page
        let petImage = data.data[i].attributes.pictureThumbnailUrl;
       
        let animalName = data.data[i].attributes.name;
        
         let animalGender = data.data[i].attributes.sex;
    
         let distance = data.data[i].attributes.distance;
    
          let description = data.data[i].attributes.descriptionHtml;

         let locationId = data.data[i].relationships.orgs.data[0].id;
         let currentPet = document.getElementById('currentPet');
         currentPet.setAttribute('class','pointer-events-none absolute inset-y-0 left-0 flex items-left pl-3');
         let img = document.createElement('img');
         img.src = petImage;
       
         
         let name = document.createElement('h2');
         name.innerHTML = `Name: `+animalName;
         
         
         let gender = document.createElement('h3');
         gender.innerHTML = `Gender: `+animalGender;
  
         
         let distanceP = document.createElement('h3');
         distanceP.innerHTML = `Distance = `+ distance + `miles away`;
         
         
        //  let descriptionP = document.createElement('h3');
        //  descriptionP.innerHTML = `Pet Description: `+ description;
        //  currentPet.appendChild(descriptionP);
 let petContainer = document.createElement('div')
         petContainer.appendChild(img)
         petContainer.appendChild(name)
         petContainer.appendChild(gender)
         petContainer.appendChild(distanceP)
         //petContainer.appendChild(descriptionP)
         currentPet.appendChild(petContainer)
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
          let locationDiv = document.createElement('div');
          let url = location.data[0].attributes.url;
          let phone = location.data[0].attributes.phone
          let street = location.data[0].attributes.street;
          let citystate = location.data[0].attributes.citystate;
          let postalcode = location.data[0].attributes.postalcode;
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
          <br>


          `;
       
          document.querySelector('#petlocation').appendChild(locationDiv);
         
          
      });
  }


  callAPI();

