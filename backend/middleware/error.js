module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500; //err.statusCode
  err.message = err.message || "Internal Server Error";

  res.status(err.statusCode).json({
    success: false,
    code: err.statusCode,
    message: err.message,
  });
};
