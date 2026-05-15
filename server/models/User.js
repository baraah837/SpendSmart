const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  name: String,

  email: String,

  password: String,

  monthlyIncome: {

    type: Number,

    default: 0

  },

  profileImage: {

    type: String,

    default: ""

  },

  createdAt: {

    type: Date,

    default: Date.now

  }

});

module.exports = mongoose.model("User", userSchema);
 