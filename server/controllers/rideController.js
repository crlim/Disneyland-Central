const fetch = require('node-fetch');

const rideController = {}

const apiUrl = 'https://api.themeparks.wiki/v1/entity/'

rideController.getWaitTime = (req, res, next) => {
  console.log('fetching live data');
  fetch(apiUrl + req.params.id + '/live')
    .then(result => result.json())
    .then(data => {
      if(!data){
        return next({
          message: { err: 'there was an error in rideController.getWaitTime' }
        })
      }
      console.log('data:', data);
      if (data.liveData.length) {
        res.locals.queue = data.liveData[0].queue;
        res.locals.status = data.liveData[0].status;
        res.locals.lastUpdated = data.liveData[0].lastUpdated;
      }
      return next();
    })
    .catch('error in fetch for getWaitTime')
}

module.exports = rideController;
