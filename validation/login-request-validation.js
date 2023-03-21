const joi = require("joi");
const renderPages = require("../util/render-pages");

//Defining the validation schema
const loginRequestSchema = joi.object({
  email: joi.string().email().required().messages({
    "string.email": "Invalid Email",
    "string.empty": "Email required",
  }),
  password: joi.string().min(8).messages({
    "string.min": "Password must be more then 8 characters",
    "string.password": "Password required",
  }),
});

// Validation Function
module.exports = async (request, response, next) => {
  try {
    const { email, password } = request.body;
    const { error } = loginRequestSchema.validate(request.body, {
      abortEarly: false,
      allowUnknown: true,
    });

    if (error)
      return renderPages.renderLoginPage(response, {
        errorMessages: error.details,
        email: email,
        password: password,
      });

    next();
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
};
