Brookebot.xyz Backend
=====================

|CodeQL|

.. |CodeQL| image:: https://github.com/bwookieeeee/brookebot.xyz-backend/actions/workflows/codeql-analysis.yml/badge.svg

A RESTful API and WebSocket server for data transfer on `Brookebot.xyz <https://brookebot.xyz>`_.

API Routes
----------

+--------+-------------------+-------------------------------------------------+
| Method | Route             | Description                                     |
+========+===================+=================================================+
| GET    | ``/``             | Root request is useful for testing if the api is|
|        |                   | working                                         |
+--------+-------------------+-------------------------------------------------+
| GET    | ``/cachedLogins`` | A list of all user login events in the last     |
|        |                   | ``LOGIN_CACHE_INTERVAL`` milliseconds           |
+--------+-------------------+-------------------------------------------------+
| GET    | ``/cachedServers``| A list of all server creation events in the last|
|        |                   | ``SERVER_CACHE_INTERVAL`` milliseconds          |
+--------+-------------------+-------------------------------------------------+
| GET    | ``/cachedPhotos`` | A list of all photo submission events in the    |
|        |                   | last ``PHOTO_CACHE_INTERVAL`` milliseconds      |
+--------+-------------------+-------------------------------------------------+

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
| ``LOGIN_CACHE_INTERVAL``         | Time in milliseconds between login cache  |
|                                  | cleaning intervals                        |
+----------------------------------+-------------------------------------------+
| ``SERVER_CACHE_INTERVAL``        | Time in milliseconds between server cache |
|                                  | cleaning intervals                        |
+----------------------------------+-------------------------------------------+
| ``PHOTO_CACHE_INTERVAL``         | Time in milliseconds between photo cache  |
|                                  | cleaning intervals                        |
+----------------------------------+-------------------------------------------+

License
-------

Copyright (c) 2021 Brooke Morrison <bwookieeeee@gmail.com>

Licensed under Apache 2.0, see LICENSE for License.