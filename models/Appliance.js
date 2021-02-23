const mongoose = require('mongoose');

const applianceSchema = new mongoose.Schema({
  name: String,
  status: Boolean,
});

const Appliance = mongoose.model('Appliance', applianceSchema);

module.exports = Appliance;
