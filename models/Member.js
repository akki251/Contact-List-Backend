const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name"],
  },

  email: {
    type: String,
    required: [true, "Please enter an email"],
    lowercase: true,
    unique: true,
  },

  contacts: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Contact",
    },
  ],
});

const Member = mongoose.model("Member", userSchema);

module.exports = Member;
