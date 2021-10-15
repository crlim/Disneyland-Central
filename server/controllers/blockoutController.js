const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');


const blockoutController = {}


blockoutController.getBlockoutDates = (req, res, next) => {
  const storedData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/availability.json'), 'UTF-8'))

  // parse through the json

  // store date key then values for blocked and available
  const dates = {};

  // store the date
  for (const day of storedData['calendar-availabilities']) {
    dates[day.date] = {};
    // get the right park
    for (const facility of day.facilities) {
      if (facility.facilityName === 'DLR_DP') {
        // store available and blocked
        dates[day.date].available = facility.available;
        dates[day.date].blocked = facility.blocked;
      }
    }
  }

  res.locals.dates = dates;
  return next();
}







// const passType = 'imagine';
// const url = `https://disneyland.disney.go.com/passes/blockout-dates/api/get-availability/?product-types=imagine-key-pass&destinationId=DLR&numMonths=13`
//const url = "https://disneyland.disney.go.com/en-ca/passes/blockout-dates/api/get-availability/?product-types=imagine-key-pass&destinationId=DLR&numMonths=13"
// const url = 'https://pokeapi.co/api/v2/pokemon/ditto'
// console.log(url);


blockoutController.XgetBlockoutDatesX = (req, res, next) => {
  console.log('in blockoutController.getBlockoutDates');
  console.log(url);
  fetch(url)
    .then(res => {
      console.log('in the res part of the fetch')
      return res.json()
    })
    .then(data => {
      if (!data) {
        console.log('no data');
        return next({
          message: {err: 'error in blockoutController.getBlockoutDates'}
        })
      }
      console.log('here is the data', data);
      res.locals.dates = data;
      return next()
    })
    .catch('error fetching blockout dates');
}



module.exports = blockoutController;
