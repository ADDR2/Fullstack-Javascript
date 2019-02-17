# Simple App to search near restaurants

## Requirements

The project was built with Node `v10.15.1` and React `v16.8.1`. The project also needs an API key of Google Maps to run. So please go to the file `/public/index.html` and add your API key there...

```
<script src="https://maps.googleapis.com/maps/api/js?key=<YOUR_KEY>"></script>
```
This project also uses Firebase. So, please add your API info for Firebase too. You can do that in this file `/server/controllers/initController`.....here:

```
this.firebase = initializeApp({
    apiKey: "<YOUR_KEY>",
    authDomain: "<YOUR_KEY>",
    databaseURL: "<YOUR_KEY>",
    projectId: "<YOUR_KEY>",
    storageBucket: "<YOUR_KEY>",
    messagingSenderId: "<YOUR_KEY>"
}).database();
```

You will need to run this command to install all the dependencies:

```
$> npm install
```

## To run

Just run this command:

```
$> npm start
```

That will build the app with the help of babel and also will run the Node server.

## Config and Behavior

The project will try to connect with Firebase and then with an external server. If that fails, then it won't start the Node server.

You can change the `clientId`, `clientSecret` and `baseURL` of the project by using environment variables.

Example:

```
$> export clientId=something
$> npm start
```

Those variables are read in `/server/controllers/initController.js`.

There are 5 endpoints in total described in the folder `/server/routes`. Check the admin routes to modify the behavior of the project and get statistics.

## Frontend functionality

The frontend will be at `localhost:3000` and there you'll need to log in in order to check the nearest restaurants. After that you will see a map that will add markers when you click on it (if there are restaurants near you) and the server will store your searchs to not request them again and again. You can also go directly to the map route on the frontend with some specific coords like so `http://localhost:3000/#/map?lat=-34.9209098815918&lng=-56.150474548339844`.

Lastly the markers can be clicked and you'll see some important information there :).