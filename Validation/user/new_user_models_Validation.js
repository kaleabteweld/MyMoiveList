const joi = require("joi");

module.exports = function (rev_data) {
  const user_models_Validation_Schema = joi.object({
    name: joi.string().max(255).not(" ").alphanum().required(),
    user_name: joi.string().max(255).min(4).required(),
    email: joi.string().email().not(" ").required(),
    password: joi.string().min(8).max(25).required(),
    repeat_password: joi.ref("password"),
  });

  const val = user_models_Validation_Schema.validate(rev_data);
  //console.log(val);

  if (val.error) {
    const errors = val.error.details;
    return {
      error_type: "joi",
      errors: errors,
    };
  } else {
    return 0;
  }
};
