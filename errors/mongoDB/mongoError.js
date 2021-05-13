module.exports = function (error, req, res, next) {
  // duplicate key error
  if (error.error.code == 11000) {
    const Error = {
      error_type: "duplicate_key",
      key: error.error.keyPattern,
      error_level: "mongoDB",
    };
    res.status(400).json(Error);
  }

  next();
};
