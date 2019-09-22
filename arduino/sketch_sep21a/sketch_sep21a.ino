


void setup() {

  /**
   *  init the wifi internet connection
   *  with a hostname so we know where to
   *  connect to
   */

}

/**
 * ilikeit state machine:                                   +------+        new client, refresh token
 *                                                          |      |  <----------------------------------+
 *    +-------+      +------------------+                   | IDLE |                                     |
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
  // put your main code here, to run repeatedly:

}
