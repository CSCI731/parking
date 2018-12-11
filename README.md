# NYCParking
It’s always very hard to find a parking spot in New York City. There are a lot of parking regulations that you can’t ignore. Overall about $200 million in parking tickets were written in Manhattan last year. The major purpose of this application is to help New Yorker to avoid parking tickets by finding out whether there are any parking regulations. Users can look up the parking spot’s regulation ahead of time to decide if they want to drive to there. The app will help New Yorker to save time and money. On the other way, it will help New York City to be a driver friendly city.

## Technologies used
### Server Side
* [Node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [GraphQL](https://graphql.org/)
* [JWT](https://jwt.io/)
### Web Side
* [React](https://reactjs.org/)
* [Ant Design](https://ant.design/)
### Third part services used
* [Google Maps APIs](https://cloud.google.com/maps-platform/)
* [GeoNames](https://www.geonames.org/)

## Getting Started

```
git clone https://github.com/CSCI731/parking
```

### Prerequisites

Install MongoDB, e.g. under Ubuntu 18.04
```
sudo apt install -y mongodb
```


### Installing

Go to server side directory
```
cd parking/server
```
Install dependencies
```
npm install
or
yarn install
```
Create file .env
```
touch .env
```
Add following content to .env file
```
PORT=5000
HOST_NAME=localhost
HTTPS=0
SSL_KEY=[/path/to/your/key/file]
SSL_CERT=[/path/to/your/cert/file]
NODE_ENV=dev
CORS_ORIGINS=[ORIGINS]
MONGODB_URI=[MONGODB_URI]
GN_USERNAME=[GEONAME_USERNAME]
GMAPS_API_KEY=[GOOGLE_MAP_API_KEY]
JWT_SECRET=[SECRET_STRING]
```
* Replace [ORIGINS] with web side's origin in order to avoid cors error
* Replace [MONGODB_URI] with you're own mongodb uri
* Replace [GEONAME_USERNAME] with the username on [GeoNames](https://www.geonames.org/)
* Replace [GOOGLE_MAP_API_KEY] with Google Maps API key. Sign up at [here](https://developers.google.com/maps/documentation/javascript/get-api-key)
* Replace [SECRET_STRING] with a complicated secret string.

Run dev server
```
npm run-script dev
or
yarn dev
```

How to create user
```
yarn user:add

#### It will prompt #####
Input email address: [email]
Input password: [password]
Input roles, separate by comma: [admin|user]

```

Go to web side directory
```
cd parking/web
```
Installing dependencies
```
npm install
or
yarn install
```
Create file .env
```
touch .env
```
Add following content to .env file
```
REACT_APP_NODE_ENV=development
REACT_APP_GOOGLE_API_KEY=[GOOGLE_MAP_API_KEY]
REACT_APP_GRAPHQL_SERVER_URI=[GRAPHQL_URI]
```
* Replace [GOOGLE_MAP_API_KEY] with Google Maps API Key. Sign up at [here](https://developers.google.com/maps/documentation/javascript/get-api-key)
* Replace [GRAPHQL_URI] with your GraphQL URI on server side

Run the web side
```
npm run-script start
or
yarn start
```

### Authors
[Jia Dong Li](jiadong.li24@qmail.cuny.edu)
[Zhenhuang Gao](Zhenhuang.Gao80@qmail.cuny.edu)

### Demo
https://nycparking.seacorn.com/