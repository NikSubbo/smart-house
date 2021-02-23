const router = require('express').Router();
const Appliance = require('../models/Appliance');

router.get('/', async (req, res, next) => {
  try {
    const appliances = await Appliance.find({});
    res.send(appliances);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
