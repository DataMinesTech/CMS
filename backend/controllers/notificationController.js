const catchAsyncError = require("../middleware/catchAsyncError");

exports.fileRecieved = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    message: "File Recieved",
  });
});

exports.fileApproved = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    message: "File Approved",
  });
});
