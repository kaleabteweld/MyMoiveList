const logger = require("./winston_init");
const mongoError = require("./mongoDB/mongoError");

module.exports = function error_root(error, req, res, next) {
  logger.error(error);
  console.log("[-] [System] error");
  console.log("[-] [System] error type: " + error.error_type);
  console.log(error);

  switch (error.error_type) {
    case "mongoDB":
      mongoError(error, req, res, next);
      break;

    default:
      break;
  }

  next();
};
