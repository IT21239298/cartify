const express = require("express");
const paymentRoute = express.Router();

const controller = require("../controllers/userpayment.controller");

paymentRoute
  .route("/api/paymentDetails")
  .post(controller.create_paymentDetails);
paymentRoute
  .route("/api/paymentDetails/:user_id")
  .get(controller.getPaymentDetailsByUserId);

module.exports = paymentRoute;
