const Router = require("express").Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

// Validation
const new_user_models_Validation = require("../Validation/user/new_user_models_Validation");
const old_user_models_Validation = require("../Validation/user/old_user_models_Validation");

// user_model
const user_model = require("../models/user_model");

//auth
const auth_md = require("../middleware/auth_md");

// make new usere
Router.post("/signIn", async (req, res, next) => {
  var data = req.body;

  //console.log(data);
  // Validation error
  const error = new_user_models_Validation(data);
  if (error) {
    res.status(400).json({ error, error_level: "Validation" });
    return;
  }

  // hash password
  try {
    var salt = await bcrypt.genSalt(10);
    var newPass = await bcrypt.hash(data.password, salt);
    data.password = newPass;
  } catch (error) {
    //console.log(error);
    // res.status(400).json({ error, error_level: "pass_hash" });
    next({ error: error, error_type: "bcrypt" });
    return;
  }

  // save to database
  //console.log(data);
  try {
    const new_user_model = new user_model(data);
    var done_data = await new_user_model.save();
    data = done_data;
  } catch (error) {
    //res.status(400).json({ error, error_level: "mongoDB" });
    next({ error: error, error_type: "mongoDB" });
    return;
  }

  //jwt

  try {
    const pavKey = config.get("jwt");
    const id = data._id;
    const token = jwt.sign({ id: id }, pavKey);
    //console.log("token: " + token);
    res.status(201).header("x-auth-token", token).status(200).json(data);
  } catch (error) {
    //console.log(error);
    //res.status(400).json({ error, error_level: "make_jwt" });
    next({ error: error, error_type: "jwt" });
  }
});

// logIn
Router.post("/logIn", async (req, res, next) => {
  var data = req.body;

  //console.log(data);
  // Validation error
  const error = old_user_models_Validation(data);
  if (error) {
    res.status(400).json({ error, error_level: "Validation" });
    return;
  }

  // check for email
  var data_find;
  try {
    data_find = await user_model.find({ email: data.email });
    // user found
    if (data_find.length != 0) {
      data_find = data_find[0];
    } // use NOT FOUND
    else {
      res.status(422).send({
        error_type: "user",
        error: "email or password not correct",
      });
    }
  } catch (error) {
    next({ error: error, error_type: "mongoDB" });
  }

  // check hash password
  try {
    const check = await bcrypt.compare(data.password, data_find.password);
    if (!check) {
      res.status(422).send({
        error_type: "user",
        error: "email or password not correct",
      });
    }
  } catch (error) {
    //console.log(error);
    // res.status(400).json({ error, error_level: "pass_hash" });
    next({ error: error, error_type: "bcrypt" });
    return;
  }

  //jwt

  try {
    const pavKey = config.get("jwt");
    const id = data_find._id;
    const token = jwt.sign({ id: id }, pavKey);
    //console.log("token: " + token);
    res.status(201).header("x-auth-token", token).status(200).json(data_find);
  } catch (error) {
    //console.log(error);
    //res.status(400).json({ error, error_level: "make_jwt" });
    next({ error: error, error_type: "jwt" });
  }
});

module.exports = Router;
