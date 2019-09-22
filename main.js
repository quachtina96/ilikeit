const rp = require('request-promise');
const express = require('express');
const bodyParser = require('body-parser');

const app = express().use(bodyParser.json());
const port = process.env.PORT ?  process.env.PORT : 1337;
app.listen(port, () => {
	console.log(`webhook is listening on port: ${port}`);
})

app.get('/', async (req, res) =>  {
	// TODO: redirect uri should point to the url of the button.
	var authorizationRequestOptions = {
		url: 'https://accounts.spotify.com/authorize',
		method: "GET",
		form: {
			client_id: process.env.CLIENT_ID,
			response_type: "code",
			redirect_uri: "http://google.com",
			scopes: "user-read-currently-playing playlist-modify-public user-library-modify"
		},
	};

	var pageToReturn;
	await rp(authorizationRequestOptions, function (error, response, body) {
	  console.error('error:', error); // Print the error if one occurred
	  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	  if (body) {
	  	pageToReturn = body
	  } // Print the HTML for the Google homepage.
	});
	if (pageToReturn) {
		res.send(pageToReturn)
	} else {
		res.send('page to return is undefined!')
	}
});