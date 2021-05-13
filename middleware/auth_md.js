const jsonwebtoken = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const tocken = req.header("x-auth-token");
  if (!tocken) {
    res.status(401).send("access denied");
  } else {
    try {
      const palyload = jsonwebtoken.verify(tocken, config.get("jwt"));
      req.palyload = { id: palyload.id };
      next();
    } catch (error) {
      res.status(422).send({ error: error });
      throw { error: error, error_type: "jsonwebtoken" };
    }
  }
};
