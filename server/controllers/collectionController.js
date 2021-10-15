const fetch = require('node-fetch');

const collectionController = {};

// url for themepark wiki: https://api.themeparks.wiki/v1/
const themeparkUrl = 'https://api.themeparks.wiki/v1/';


collectionController.getDisneylandId = (req, res, next) => {
  console.log('in rideController.getDisneylandId')
  // get the disneyland id (currently bfc89fd6-314d-44b4-b89e-df1a89cf991e)
  const destinationsUrl = themeparkUrl + 'destinations';

  console.log('fetching from', destinationsUrl);
  fetch(destinationsUrl)
    .then((fetchResp) => fetchResp.json())
    .then((data) => {
      if (!data) {
        console.log('logging error in getDisneylandId');
        return next({
          message: { err: 'there was an error in collectionController.getDisneylandId' }
        })
      }
      console.log('finding id')
      // find disneyland id
      // for every destination
      for (el of data.destinations) {
        // if name matches Disneyland Resort
        if (el.name === 'Disneyland Resort') {
          // get the id
          for (park of el.parks){
            if (park.name === 'Disneyland Park') {
              res.locals.disneylandId = park.id;
            }
          }
        }
      }
      return next();
    })
    .catch('catch error in rideController.getRides');

}

collectionController.getParkInfo = (req, res, next) => {
  console.log('in getParkInfo');
  fetch(themeparkUrl + 'entity/' + res.locals.disneylandId)
    .then(fetchResp => fetchResp.json())
    .then(data => {
      if (!data) {
        return next({
          message: { err: 'there was an error in collectionController.getParkInfo' }
        })
      }
      res.locals.parkData = data;
      return next();
    })
    .catch('catch error in getParkInfo')
}

collectionController.getRides = (req, res, next) => {
  // res.locals now contains the disneyland id
  // return the rides
  console.log('in rideController.getRides');
  // get ride list

  fetch(themeparkUrl + 'entity/' + res.locals.disneylandId + '/children')
    .then(result => result.json())
    .then(data => {
      if (!data) {
        return next({
          message: { err: 'there was an error in collectionController.getRides' }
        })
      }
      // console.log(data.children);
      // res.locals.rides = data.children;
      const rides = [];
      for (ride of data.children) {
        rides.push({name: ride.name, id: ride.id, type: ride.entityType});
      }
      res.locals.rides = rides;
      return next();
    })
    .catch('catch error in getRides')
}


module.exports = collectionController;
