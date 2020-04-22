import Joi from "joi";
export const validateSignupInput = (userRegistrationInput) => {
  const errors = {};
  console.log({ userRegistrationInput });
  const schemaConstraint = Joi.object({
    username: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(50).email({ minDomainAtoms: 2 }),
    password: Joi.string().min(5).required(),
    confirmPassword: Joi.ref("password"),
  });

  let { error, value } = Joi.validate(userRegistrationInput, schemaConstraint, {
    abortEarly: false,
  });
  console.log({ error, value, isErrorNull: !error });

  if (error) {
    console.log({ value, errorDetails: error.details });
    error.details.forEach(({ message, path }, i) => {
      if (message.indexOf("confirm") >= 0) {
        message = "Password doesn't should match!";
        error.details[i].message = message;
        console.log({ message, i });
      }
      //update custom errors object
      if (path.length > 0) errors[path[0]] = message;
    });
    console.log({ errors, userRegistrationInput });
    //return here
    return {
      errors,
      valid: false,
    };
  }
  console.log({ errorsAfterValidation: errors });
  return {
    errors,
    valid: true,
  };
};

export const validateSigninInput = (username, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username shouldn't be empty ";
  }
  if (password === "") {
    errors.password = "You should enter a password shouldn't be empty ";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
