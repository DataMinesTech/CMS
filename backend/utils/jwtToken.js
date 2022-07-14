const sendToken = (user, statusCode, message, res) => {
  const token = user.getJWTToken();

  const options = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res.status(statusCode).cookie("token", token, options).json({
    code: statusCode,
    success: true,
    user,
    message: message,
    token,
  });
};

module.exports = sendToken;
