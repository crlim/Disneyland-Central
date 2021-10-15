const express = require('express');

const collectionController = require('../controllers/collectionController');

const router = express.Router();

router.get('/',
  (req, res, next) => {
    console.log('in router get /');
    return next();
  },
  collectionController.getDisneylandId,
  collectionController.getParkInfo,
  collectionController.getRides,
  (req, res) => {
    return res.status(200).json({
      disneylandId: res.locals.disneylandId,
      parkData: {...res.locals.parkData},
      rides: [...res.locals.rides],
    });
  }
)

module.exports = router;
