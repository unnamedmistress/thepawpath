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