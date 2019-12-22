// This file is mostly copied from the zmb3/spotify library which provides a wrapper around the
// Spotify Web API in Golang (https://github.com/zmb3/spotify.git).
// The exact file is:
// https://github.com/zmb3/spotify/blob/master/examples/authenticate/authcode/authenticate.go

// This example demonstrates how to authenticate with Spotify using the authorization code flow.
// In order to run this example yourself, you'll need to:
//
//  1. Register an application at: https://developer.spotify.com/my-applications/
//       - Use "http://localhost:8080/callback" as the redirect URI
//  2. Set the SPOTIFY_ID environment variable to the client ID you got in step 1.
//  3. Set the SPOTIFY_SECRET environment variable to the client secret from step 1.
package main

import (
	"fmt"
	"log"
	"net/http"
  "sync"
	"github.com/zmb3/spotify"
)

// redirectURI is the OAuth redirect URI for the application.
// You must register an application at Spotify's developer portal
// and enter this value.
const redirectURI = "http://localhost:8080/callback"

var (
	auth  = spotify.NewAuthenticator(redirectURI, spotify.ScopeUserReadPrivate, spotify.ScopeUserLibraryModify, spotify.ScopeUserReadPlaybackState)
	ch    = make(chan *spotify.Client)
	state = "abc123"
)

func main() {
	// first start an HTTP server
	http.HandleFunc("/callback", completeAuth)
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		log.Println("Got request for:", r.URL.String())
	})
	go http.ListenAndServe(":8080", nil)

	url := auth.AuthURL(state)
	fmt.Println("Please log in to Spotify by visiting the following page in your browser:", url)

	// wait for auth to complete
	client := <-ch

	// use the client to make calls that require authorization
	user, err := client.CurrentUser()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("You are logged in as:", user.ID)
  var wg sync.WaitGroup
  wg.Add(1)
  http.HandleFunc("/command", func (w http.ResponseWriter, r *http.Request) {
    handleCommand(w, r, client)
  })

  http.HandleFunc("/exit", func (w http.ResponseWriter, r *http.Request) {
    wg.Done()
  })

  wg.Wait()
}

func completeAuth(w http.ResponseWriter, r *http.Request) {
	tok, err := auth.Token(state, r)
	if err != nil {
		http.Error(w, "Couldn't get token", http.StatusForbidden)
		log.Fatal(err)
	}
	if st := r.FormValue("state"); st != state {
		http.NotFound(w, r)
		log.Fatalf("State mismatch: %s != %s\n", st, state)
	}
	// use the token to get an authenticated client
	client := auth.NewClient(tok)
	fmt.Fprintf(w, "Login Completed!")
	ch <- &client
}

func handleCommand(w http.ResponseWriter, r *http.Request, client *spotify.Client) {
  playing, err := client.PlayerCurrentlyPlaying()
  if err != nil {
    fmt.Printf("Failed to get currently playing %+v\n", playing)
    fmt.Println(err)
    return
  }
  // name := playing.Item.SimpleTrack.Name
  // id := playing.Item.SimpleTrack.ID
  if playing == nil {
    fmt.Printf("Current playing is nil")
    return
  }
  if playing.Item != nil {
    fmt.Println(playing.Item.SimpleTrack.String())
    err := client.AddTracksToLibrary(playing.Item.SimpleTrack.ID)
    if err != nil {
      fmt.Printf("Failed to add track to library, track ID: %d", playing.Item.SimpleTrack.ID)
    }
  }
  }
