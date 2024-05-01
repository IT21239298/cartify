const express = require("express");
const reviewRoute = express.Router();

const controller = require("../controllers/reviewController");

reviewRoute.route("/api/review").post(controller.create_Review);

module.exports = reviewRoute;
