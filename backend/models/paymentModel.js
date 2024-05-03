const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
 
  email: {
    type: String,
    required: true,
  }, 
  user_id: {
    type: String,
    required: true,
  },

  holder: {
    type: String,
    required: true,
  },
  card: {
    type: Number,
    required: true,
  },
  expire: {
    type: Number,
    required: true,
  },
  cvc: {
    type: Number,
    required: true,
  },
  addres: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;