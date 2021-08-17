Brookebot.xyz Backend
=====================

|CodeQL|

|CodeQL| image:: https://github.com/bwookieeeee/brookebot.xyz-backend/actions/workflows/codeql-analysis.yml/badge.svg

A RESTful API and WebSocket server for data transfer on `Brookebot.xyz <https://brookebot.xyz>`_.

API Routes
----------

+--------+------------------+--------------------------------------------------+
| Method | Route            | Description                                      |
+========+==================+==================================================+
| GET    | ``/``            | Root request is useful for testing if the api is |
|        |                  | working                                          |
+--------+------------------+--------------------------------------------------+
| GET    | ``/cachedUsers`` | A list of all user login events in the last      |
|        |                  | ``USER_CACHE_INTERVAL`` milliseconds             |
+--------+------------------+--------------------------------------------------+

WS events
---------

None yet. :(

``.env`` File 
-------------

Important variables are stored in a ``.env`` file and are referenced regularly
throughout the project.

+----------------------------------+-------------------------------------------+
| Name                             | Description                               |
+==================================+===========================================+
| ``API_PORT``                     | The port that the API server is hosted on |
+----------------------------------+-------------------------------------------+
| ``EXTERNAL_SOCKET_URL``          | The websocket url to listen on for events |
+----------------------------------+-------------------------------------------+ 
| ``EXTERNAL_SOCKET_INTERNAL_KEY`` | The key for the remote socket internal    |
|                                  | listener                                  |
+----------------------------------+-------------------------------------------+
| ``SOCKET_PORT``                  | The port that the websocket server is     |
|                                  | hosted on                                 |
+----------------------------------+-------------------------------------------+
| ``USER_CACHE_INTERVAL``          | Time in milliseconds between user cache   |
|                                  | cleaning intervals                        |
+----------------------------------+-------------------------------------------+

License
-------

Copyright (c) 2021 Brooke Morrison <bwookieeeee@gmail.com>

Licensed under Apache 2.0, see LICENSE for License.