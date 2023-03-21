const joi = require("joi");
const userDao = require("../data/DAOs/user-dao");
const renderPages = require("../util/render-pages");

// Defining the Validation Schema
const signupRequestSchema = joi.object({
  email: joi.string().email().required().messages({
    "string.email": "Invalid Email",
    "string.empty": "Email required",
  }),
  userName: joi.string().required().messages({
    "string.empty": "UserName required",
  }),
  password: joi.string().min(8).messages({
    "string.min": "Password must be more then 8 characters",
    "string.password": "Password required",
  }),
});

// Validation Function
module.exports = async (request, response, next) => {
  try {
    const { email, password, userName } = request.body;
    const { error } = signupRequestSchema.validate(request.body, {
      abortEarly: false,
      allowUnknown: true,
    });

    // Errors From Validation Schema
    if (error)
      return renderPages.renderSignupPage(response, {
        errorMessages: error.details,
        email: email,
        password: password,
        userName: userName,
      });
    const existsUser = await userDao.getUserByEmail(email);
    // Account exits with this email
    if (existsUser)
      return renderPages.renderSignupPage(response, {
        errorMessages: [
          {
            message: "There is an account exits with this email",
            path: ["email"],
          },
        ],
        email: email,
        password: password,
        userName: userName,
      });

    next();
  } catch (error) {
    console.error(error);
    response.sendStatus(500);
  }
};
