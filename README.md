# ilikeit

ilikeit is a button you can press to like the song you're currently listening to in spotify without touching your laptop or phone!

# how it works
we request an authorization code from spotify using our client id and secret. This authorization code gives us an access token, refresh token, and expiration time for the access token. To keep access, we must refresh our token before the expiration time by passing Spotify our refresh token.

## initial setup
when the button turns on, it starts a webserver, waiting for us to give it the refresh token. Via our own app, we log in to spotify using their authorization code flow to obtain the first refresh token. we then pass this refresh token to our button. from then on, the button should be able to refresh the token, interacting directly with the Spotify API.

## usage
when the button is pressed, we make a call to the Spotify API to
1) get the currently playing song
GET https://api.spotify.com/v1/me/player/currently-playing
2) put the song in liked/saved songs.
PUT https://api.spotify.com/v1/me/tracks