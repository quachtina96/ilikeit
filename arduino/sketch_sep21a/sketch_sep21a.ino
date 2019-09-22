

typedef struct {
} spotify_session_t;

spotify_session_t *run_webserver_get_spotify_session();
bool               button_was_pressed();
bool               save_current_track(spotify_session_t *session);
bool               time_to_refresh_session(spotify_session_t *session);
bool               refresh_spotify_session(spotify_session_t *session);

void setup() {

  /**
   *  init the wifi internet connection
   *  with a hostname so we know where to
   *  connect to
   */

  // XXX:TODO

}

/**
 *    ilikeit state machine:                           failure
 *                                                   +--------------------------------------------------------+
 *                                                   |      +------+        new client, refresh token        |
 *                                                   |      |      |  <----------------------------------+   |
 *    +-------+      +------------------+  <---------+      | IDLE |                                     |   |
 *    | RESET | ---->| Run Webserver    |   token obtained  |      |  refresh interval timeout   +------------------+
 *    +-------+      | to obtain first  | ----------------> |      | --------------------------> | obtain new token |
 *                   | refresh token    |                   +------+                             | from spotify     |
 *                   +------------------+                    ^  |                                +------------------+
 *                           ^                               |  |  user presses button +-------------------+
 *                           |                               |  +--------------------->| Save current      |
 *                           |                               |                         | track to playlist |
 *                           |                               |                         +-------------------+
 *                           |                               |          success                 |     |
 *                           |         failure               +----------------------------------+     |
 *                           +------------------------------------------------------------------------+
 */

void loop() {
  // As a first attempt, implement all behavior
  // in a polling loop

  spotify_session_t *session = run_webserver_get_spotify_session();

  while (1) {

    /**
     * check if button was pressed so we can save the current song
     * a button press is defined as a HIGH to LOW transition
     */
    if (button_was_pressed()) {
      if (!save_current_track(session)) {
        /**
         * if there was an error saving the track,
         * then restart the webserver and get a new token
         * since ours probably expired
         */
        break;
      }
    }


    /**
     * Check if we must renew our token to continue operating
     */
    if (time_to_refresh_session(session)) {
      if (!refresh_spotify_session(session)) {
        break;
      }
    }

  }

}

spotify_session_t *run_webserver_get_spotify_session() {

  /**
   * keep session as a static variable instead of a global
   * to make sure the pointer returned from this function
   * is always used
   */
  static spotify_session_t session;

  //XXX:TODO

  return &session;
}

bool button_was_pressed() {
  //XXX:TODO
  return false;
}

bool save_current_track(spotify_session_t *session) {
  //XXX:TODO
  return false;
}

bool time_to_refresh_session(spotify_session_t *session) {
  //XXX:TODO
  return false;
}

bool refresh_spotify_session(spotify_session_t *session) {
  //XXX:TODO
  return false;
}
