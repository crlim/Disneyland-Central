
const express = require('express');
const router = express.Router();

const blockoutController = require('../controllers/blockoutController');


router.get('/',
  (req, res, next) => {
    console.log('in blockoutController');
    return next();
  },
  blockoutController.getBlockoutDates,
  (req, res) => {
    return res.status(200).json({
      dates: res.locals.dates
    });
  }
)



module.exports = router;
