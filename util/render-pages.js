exports.renderSignupPage = async (
  response,
  {
    errorMessages = [],
    updateMessages = [],
    email = "",
    password = "",
    userName = "",
  } = {}
) => {
  response.render("auth/signup", {
    pageTitle: "signup",
    path: "/signup",
    errorMessages: errorMessages,
    updateMessages: updateMessages,
    email: email,
    password: password,
    userName: userName,
  });
};

exports.renderLoginPage = async (
  response,
  { errorMessages = [], updateMessages = [], email = "", password = "" } = {}
) => {
  response.render("auth/login", {
    pageTitle: "login",
    path: "/login",
    errorMessages: errorMessages || [],
    updateMessages: updateMessages || [],
    email: email || "",
    password: password || "",
  });
};
