const router = require('express').Router();
const Appliance = require('../models/Appliance');

router.post('/', async (req, res, next) => {
  try {
    const { name, status } = req.body.appliance;
    const newAppliance = await Appliance.create({ name, status });
    res.send(newAppliance);
  } catch (error) {
    next(error);
  }
});

router
  .route('/:id')
  .patch(async (req, res, next) => {
    try {
      const updatedAppliance = await Appliance.findOneAndUpdate({ _id: req.params.id }, { $set: { status: req.body.status } }, { new: true });
      res.send(updatedAppliance);
    } catch (error) {
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const updatedAppliance = await Appliance.findOneAndUpdate({ _id: req.params.id }, { $set: { name: req.body.name } }, { new: true });
      res.send(updatedAppliance);
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const deleteOutput = await Appliance.deleteOne({ _id: req.params.id });
      (deleteOutput.deletedCount === 1) ? res.sendStatus(200) : res.sendStatus(500);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
