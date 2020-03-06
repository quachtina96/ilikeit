const rp = require('request-promise');
const express = require('express');
const bodyParser = require('body-parser');

const app = express().use(bodyParser.json());
const port = process.env.PORT ?  process.env.PORT : 1337;
app.listen(port, () => {
	console.log(`webhook is listening on port: ${port}`);
})

// https://accounts.spotify.com/authorize/?client_id=1acbf1f724124569918e0b27034a1a1a&response_type=code&redirect_uri=https://spotify-ilikeit.herokuapp.com/&scope=user-read-currently-playing%20playlist-modify-public%20user-library-modify

const accessToken = process.env.ACCESS_TOKEN;
const expiresIn = process.env.EXPIRES_IN;
const refreshToken = process.env.REFRESH_TOKEN;

var refreshAccessToken = () => {
	var authPostOptions = {
		url: "https://accounts.spotify.com/api/token",
		method: "POST",
		form: {
			grant_type: "authorization_code",
			code: refreshToken,
			redirect_uri: "https://spotify-ilikeit.herokuapp.com/",
			client_id: process.env.CLIENT,
			client_secret: process.env.CLIENT_SECRET
		}
	}
}

var makeAuthorizedRequestAndRefresh = async (requestOptions, callback) => {
	var requestWithAuthorization = Object.assign({}, requestOptions);
	requestWithAuthorization.headers = {
		'Authorization': `Bearer ${accessToken}`
	}
	rp(requestOptions, (error, response, body) => {
		if (error) {
			console.error('error:', error);
		}
		console.log('statusCode:', response && response.statusCode);
		if (parseInt(response.statusCode) == 401) {
			// Refresh token.
			refreshAccessToken()
		}
	})
};

var getCurrentlyPlayingSong = () => {
	makeAuthorizedRequestAndRefresh({
		uri:'https://api.spotify.com/v1/me/player/currently-playing',
	}, (error, response, body) => {

	});
};

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
	  	// Store access tokens.
	  	const accessToken = body.access_token;
	  	process.env.ACCESS_TOKEN = accessToken;

		const expiresIn = body.expires_in;
		process.env.EXPIRES_IN = expiresIn;

		const refreshToken = body.refresh_token
		process.env.REFRESH_TOKEN = body.refresh_token;

	  	// body.access_token
	  	// body.expires_in
	  	// body.refresh_token
	  } // Print the HTML for the Google homepage.
	});
	if (result) {

		var testCodeOptions = {
			url: 'https://api.spotify.com/v1/me/player/currently-playing',
			headers: {
				"Authorization": `Bearer ${result.access_token}`
			}
		};
		console.log('TEST CODE OPTIONS');
		console.log(testCodeOptions)
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

// app.get('/savesong', async (req,res) => {

// 	req.query.access_token
// 	// body.access_token
// 	  	// body.expires_in
// 	  	// body.refresh_token
// });

