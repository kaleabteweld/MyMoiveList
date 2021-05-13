const joi = require("joi");

module.exports = function (rev_data) {
  const user_models_Validation_Schema = joi.object({
    email: joi.string().email().not(" ").required(),
    password: joi.string().min(8).max(25).required(),
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
