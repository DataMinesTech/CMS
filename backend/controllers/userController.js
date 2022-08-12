const User = require("../models/userModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const Errorhandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendMail");
const multer = require("multer");

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const user = await User.create(req.body);

  if (req.body.password !== req.body.confirmPassword) {
    return next(new Errorhandler("Password does not match", 400));
  }

  sendToken(user, 201, "User Successfully Created", res);
});

//Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new Errorhandler("Please Enter Email and Password", 400));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new Errorhandler("Invalid Email or Password", 400));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new Errorhandler("Invalid Email or Password", 400));
  }

  sendToken(user, 200, "User Successfully Logged In", res);
});

exports.sendAttachment = catchAsyncError(async (req, res, next) => {
  console.log("req.body", req.body);

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new Errorhandler("User Not Found", 404));
  }

  // var maxSize = 10 * 1000 * 1000;

  // const Storage = multer.diskStorage({
  //   destination: function (req, file, callback) {
  //     callback(null, "./files");
  //   },
  //   filename: function (req, file, callback) {
  //     callback(
  //       null,
  //       file.fieldname + "_" + Date.now() + "_" + file.originalname
  //     );
  //   },
  // });

  // var upload = multer({
  //   storage: Storage,
  // }).single("file");

  // upload(req, res, function (err) {
  //   if (err) {
  //     console.log("error snding mail", err);
  //   } else {
  //     const message = req.body.message;
  //     // const path = req.body.file;

  //     console.log("path", path);

  //     try {
  //       sendEmail({
  //         email: user.email,
  //         subject: "Data",
  //         message,
  //       });

  //       res.status(200).json({
  //         success: true,
  //         message: `Email sent to ${user.email} successfully`,
  //       });
  //     } catch (e) {
  //       console.log(e, "e");
  //     }
  //   }
  // });

  try {
    if (!req.files) {
      res.send({
        status: "failed",
        message: "No file uploaded",
      });
    } else {
      let file = req.files.file;

      console.log(req.files);

      file.mv("./uploads/" + file.name);

      res.send({
        status: "success",
        message: "File is uploaded",
        data: {
          name: file.name,
          mimetype: file.mimetype,
          size: file.size,
        },
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  req.session.destroy();
  res.clearCookie("connect.sid");

  res.status(200).json({
    success: true,
    code: 200,
    message: "Logged Out Successfully",
  });
});
