const mongoose = require("mongoose");
const Review = require("../models/reviewModel");

async function create_Review(req, res) {
    try {
      const { decition, comment, product_id, cus_id, cus_name, cus_image } = req.body;

      const newReview= new Review({
        decition,
        comment,
        product_id,
        cus_id,
        cus_name,
        cus_image,
      });
       
      await newReview.save();
  
    
      return res.status(201).json({ message: "Review added successfully" });
    } catch (error) {
     
      console.error("Error adding Review:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  module.exports = {
    create_Review,  
  };
  