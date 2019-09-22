const rp = require('request-promise');
const express = require('express');
const bodyParser = require('body-parser');

const app = express().use(bodyParser.json());
const port = process.env.PORT ?  process.env.PORT : 1337;
app.listen(port, () => {
	console.log(`webhook is listening on port: ${port}`);
})

app.get('/', async (req, res) =>  {
	console.log(window.location.href);
	console.log(req.params);

	// var authPostOptions = {
	// 	uri: 'https://accounts.spotify.com/api/token',
	// 	method: 'POST',
	// 	grant_type: "authorization_code",
	// 	code: authorization_code

	// }

	// 	var pageToReturn;
	// await rp(authorizationRequestOptions, function (error, response, body) {
	//   console.error('error:', error); // Print the error if one occurred
	//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	//   if (body) {
	//   	pageToReturn = body
	//   } // Print the HTML for the Google homepage.
	// });
	// if (pageToReturn) {
	// 	res.send(pageToReturn)
	// } else {
	// 	res.send('page to return is undefined!')
	// }
});


// var authPostOptions = {
// 	uri: 'https://accounts.spotify.com/api/token',
// 	method: 'POST',
// 	grant_type: "authorization_code",
// 	code: AQBppAMTrS_TfA1sFbhbGqM2XYZ7nbZFGMI8SA4m3nwdAT2NmgK9rjg5zYEliqfuQlri1-hhU1l-WAmNBTxk1or2TDist89WtSxq6xqnA3xVHLUifqgnOCLxjOAYmN-3F48LthNlgq4VWEZ0m3NoVb5Tv1HBtRXzY7Ye1kpC5hygdALHOJOratTFftZI0FH3Znka-7Ypu6VDI4C7ABmSUPW2Is41uiBJdRbr-csETSw8tHlBZ9nNa_B56-82qM-_blJffuB5171IeN5xAPeU6JAWRJo5szCrfg

// }
// rp(authPostOptions, (e,res,body) => {

// })

// https://accounts.spotify.com/authorize
// var getUrl = () =>{
// 	client_id = '1acbf1f724124569918e0b27034a1a1a'
// 	redirect_uri = 'file:///Users/quacht/Documents/yanni/ilikeit/ilikeit.html'
// 	console.log(`https://accounts.spotify.com/authorize/?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=user-read-currently-playing playlist-modify-public user-library-modify
// // &show_dialog=true`)
// }

// getUrl()
