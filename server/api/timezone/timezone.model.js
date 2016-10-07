'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TimezoneSchema = new Schema({
  userId: {type: String}, 

  name: {type: String},
  nameOfCity: {type: String},
  differenceToGMT: Number, 

  active: Boolean
});

/**
 * Validations
 */
var isExisting = function(value) {
  return value && value.length;
};

TimezoneSchema
  .path('name')
  .validate(function(name) {
    return isExisting(name);
  }, 'timezone entry can not be saved without name.');


TimezoneSchema
  .path('nameOfCity')
  .validate(function(nameOfCity) {
    return isExisting(nameOfCity);
  }, 'timezone entry can not be saved without the name of the city in the timezone.');

TimezoneSchema
  .path('differenceToGMT')
  .validate(function(differenceToGMT) {
    return isExisting(differenceToGMT);
  }, 'timezone entry can not be saved without the difference to GMT.');

module.exports = mongoose.model('Timezone', TimezoneSchema);
