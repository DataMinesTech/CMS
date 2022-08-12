const mongoose = require("mongoose");
const validator = require("validator");
const Errorhandler = require("../utils/errorHandler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "please enter your first name"],
  },
  lastName: {
    type: String,
    required: [true, "please enter your last name"],
  },
  password: {
    type: String,
    required: [true, "please enter password"],
    minlength: [
      8,
      "password field must have 8 character and special character",
    ],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "please confirm your entered password"],
    minlength: [
      8,
      "confirmPassword field must have 8 character and special character",
    ],
  },
  email: {
    type: String,
    required: [true, "please enter your email id"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  role: {
    type: String,
    enum: ["user", "contractor", "supplier", "admin"],
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: String,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  this.confirmPassword = await bcrypt.hash(this.confirmPassword, 10);
});

// JWT token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24 * 1000,
  });
};

// compare password while login
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//generating password token
userSchema.methods.getResetPasswordToken = async function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; //15 minutes to expire

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
