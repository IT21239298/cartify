const express = require("express");
const adminreviewRoute = express.Router();

const controller = require("../controllers/adminreview.controller");

adminreviewRoute.route("/api/getadminsellers").get(controller.getSellerbyRoles);
adminreviewRoute.route("/api/review").get(controller.getReviews);

module.exports = adminreviewRoute;
