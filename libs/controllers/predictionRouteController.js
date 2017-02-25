const util = require('../util');
const parser = require('../requestParser');
const errors = require('../errors');
const Prediction = require('../Prediction');


const controller = module.exports;

controller.handleOrderPrediction = (req, cb) => {
  const businessID = req.params.id;
  const prediction = new Prediction();
  prediction.getOrderPrediction(businessID, cb);
};
