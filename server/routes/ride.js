const express = require('express');
const router = express.Router();

const rideController = require('../controllers/rideController');

router.get('/:id',
  rideController.getWaitTime,
  (req, res) => {
    return res.status(200).json({
      queue: {...res.locals.queue},
      status: res.locals.status,
      lastUpdated: res.locals.lastUpdated,
    });
  }
)

module.exports = router;
