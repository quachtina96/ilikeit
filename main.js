const rp = require('request-promise');
const express = require('express');
const bodyParser = require('body-parser');

const app = express().use(bodyParser.json());
const port = process.env.PORT ?  process.env.PORT : 1337;
app.listen(port, () => {
	console.log(`webhook is listening on port: ${port}`);
})

// https://accounts.spotify.com/authorize/?client_id=1acbf1f724124569918e0b27034a1a1a&response_type=code&redirect_uri=https://spotify-ilikeit.herokuapp.com/&scope=user-read-currently-playing%20playlist-modify-public%20user-library-modify

app.get('/', async (req, res) =>  {

	var authPostOptions = {
		url: "https://accounts.spotify.com/api/token",
		method: "POST",
		form: {
			grant_type: "authorization_code",
			code: req.query.code,
			redirect_uri: "https://spotify-ilikeit.herokuapp.com/",
			client_id: process.env.CLIENT,
			client_secret: process.env.CLIENT_SECRET
		}
	}

	var result;
	await rp(authPostOptions, function (error, response, body) {
	  console.error('error:', error); // Print the error if one occurred
	  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	  if (body) {
	  	console.log(body)
	  	result = body;
	  	// TODO: Send auth info to web server hosted by button.
	  	// body.access_token
	  	// body.expires_in
	  	// body.refresh_token
	  } // Print the HTML for the Google homepage.
	});
	if (result) {
		var testCodeOptions = {
			url: 'https://api.spotify.com/v1/me',
			headers: {
				"Authorization": `Bearer ${result.access_token}`
			}
		};
		rp(testCodeOptions, (error, response, body) => {
			console.error('error:', error); // Print the error if one occurred
	  		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
			var aboutMe = body
			res.send({
				result: result,
				aboutMe: aboutMe
			});
		})
	} else {
		res.send('NO RESULT');
	}
});


