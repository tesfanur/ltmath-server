"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateSigninInput = exports.validateSignupInput = undefined;

var _joi = require("joi");

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateSignupInput = exports.validateSignupInput = function validateSignupInput(userRegistrationInput) {
  var errors = {};
  console.log({ userRegistrationInput: userRegistrationInput });
  var schemaConstraint = _joi2.default.object({
    username: _joi2.default.string().min(5).max(50).required(),
    email: _joi2.default.string().min(5).max(50).email({ minDomainAtoms: 2 }),
    password: _joi2.default.string().min(5).required(),
    confirmPassword: _joi2.default.ref("password")
  });

  var _Joi$validate = _joi2.default.validate(userRegistrationInput, schemaConstraint, {
    abortEarly: false
  }),
      error = _Joi$validate.error,
      value = _Joi$validate.value;

  console.log({ error: error, value: value, isErrorNull: !error });

  if (error) {
    console.log({ value: value, errorDetails: error.details });
    error.details.forEach(function (_ref, i) {
      var message = _ref.message,
          path = _ref.path;

      if (message.indexOf("confirm") >= 0) {
        message = "Password doesn't match!";
        error.details[i].message = message;
        console.log({ message: message, i: i });
      }
      //update custom errors object
      if (path.length > 0) errors[path[0]] = message.replace(/\"/g, "");
    });
    console.log({ errors: errors, userRegistrationInput: userRegistrationInput });
    //return here
    return {
      errors: errors,
      valid: false
    };
  }
  console.log({ errorsAfterValidation: errors });
  return {
    errors: errors,
    valid: true
  };
};

var validateSigninInput = exports.validateSigninInput = function validateSigninInput(username, password) {
  var errors = {};
  if (username.trim() === "") {
    errors.username = "Username shouldn't be empty ";
  }
  if (password === "") {
    errors.password = "You should enter a password, it shouldn't be empty ";
  }
  return {
    errors: errors,
    valid: Object.keys(errors).length < 1
  };
};