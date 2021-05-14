const Router = require("express").Router();
const _ = require("lodash");

// user_model
const user_model = require("../models/user_model");

//auth
const auth_md = require("../middleware/auth_md");

//get your data
Router.get("/", auth_md, async (req, res, next) => {
  //console.log("mee");
  try {
    const id = req.palyload.id;
    const data = await user_model.findById(id).exec();
    data.password = undefined;
    if (data == null) {
      res.status(401).send({ error_type: "unauthorized" });
    } else res.status(200).send(data);
  } catch (error) {
    //res.status(422).send({ error_type: "mongooes", error: err });
    next({ error: error, error_type: "mongoDB" });
  }
  //req.palyload.id = undefined;
});
// set like Moive's
Router.post("/like", auth_md, async (req, res, next) => {
  var data = req.body;

  const movieID = data.movieID;
  const updataType = data.updataType;
  var id = req.palyload.id;

  //   console.log("movieID ", movieID);
  //   console.log("updataType ", updataType);
  //   console.log("id ", id);

  if (updataType == "add") {
    try {
      const data = await user_model
        .findByIdAndUpdate(
          id,
          { $addToSet: { like: { id: movieID } } },
          {
            new: true,
          }
        )
        .exec();
      console.log("data", data);
      data.password = undefined;
      if (data == null) {
        res.status(401).send({ error_type: "unauthorized" });
      } else res.status(200).send(data);
    } catch (error) {
      //res.status(422).send({ error_type: "mongooes", error: err });
      next({ error: error, error_type: "mongoDB" });
    }
  } else if (updataType == "remove") {
    try {
      const data = await user_model
        .findByIdAndUpdate(
          id,
          { $pull: { like: { id: movieID } } },
          {
            new: true,
          }
        )
        .exec();
      //console.log("data", data);
      data.password = undefined;
      if (data == null) {
        res.status(401).send({ error_type: "unauthorized" });
      } else res.status(200).send(data);
    } catch (error) {
      //res.status(422).send({ error_type: "mongooes", error: err });
      next({ error: error, error_type: "mongoDB" });
    }
  }
});
// set book Moive's
Router.post("/book", auth_md, async (req, res, next) => {
  var data = req.body;

  const movieID = data.movieID;
  const updataType = data.updataType;
  var id = req.palyload.id;

  //   console.log("movieID ", movieID);
  //   console.log("updataType ", updataType);
  //   console.log("id ", id);

  if (updataType == "add") {
    try {
      const data = await user_model
        .findByIdAndUpdate(
          id,
          { $addToSet: { book: { id: movieID } } },
          {
            new: true,
          }
        )
        .exec();
      //console.log("data", data);
      data.password = undefined;
      if (data == null) {
        res.status(401).send({ error_type: "unauthorized" });
      } else res.status(200).send(data);
    } catch (error) {
      //res.status(422).send({ error_type: "mongooes", error: err });
      next({ error: error, error_type: "mongoDB" });
    }
  } else if (updataType == "remove") {
    try {
      const data = await user_model
        .findByIdAndUpdate(
          id,
          { $pull: { book: { id: movieID } } },
          {
            new: true,
          }
        )
        .exec();
      //console.log("data", data);
      data.password = undefined;
      if (data == null) {
        res.status(401).send({ error_type: "unauthorized" });
      } else res.status(200).send(data);
    } catch (error) {
      //res.status(422).send({ error_type: "mongooes", error: err });
      next({ error: error, error_type: "mongoDB" });
    }
  }
});

module.exports = Router;
