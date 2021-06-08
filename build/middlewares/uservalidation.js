"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _validator = _interopRequireDefault(require("validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var userValidator = /*#__PURE__*/function () {
  function userValidator() {
    _classCallCheck(this, userValidator);
  }

  _createClass(userValidator, [{
    key: "signUp",
    value: function signUp(req, res, next) {
      var _req$body = req.body,
          firstName = _req$body.firstName,
          lastName = _req$body.lastName,
          email = _req$body.email,
          password = _req$body.password,
          homeAddress = _req$body.homeAddress,
          workAddress = _req$body.workAddress;
      var catchErrors = {};

      if (firstName == undefined || lastName == undefined || email == undefined || password == undefined || homeAddress == undefined || workAddress === undefined) {
        return res.status(422).json({
          status: 'Failed',
          message: 'All or some fields are empty'
        });
      }

      if (!_validator["default"].isLength(firstName, {
        min: 2
      })) {
        catchErrors.firstName = 'First name length must be at least two characters long';
      }

      if (firstName.search(/^[a-zA-Z]*$/) === -1) {
        catchErrors.firstName = 'Firstname should only be Alphabets';
      }

      if (homeAddress.search(/^([a-zA-Z0-9 _-]+)$/) === -1) {
        catchErrors.homeAddress = 'Field should be alphabets and numbers';
      }

      if (_validator["default"].isEmpty(homeAddress)) {
        catchErrors.homeAddress = 'Field cannot be Empty';
      }

      if (!_validator["default"].isLength(homeAddress, {
        min: 10,
        max: 40
      })) {
        catchErrors.homeAddress = 'homeAddress length must be at least ten characters long';
      }

      if (workAddress.search(/^([a-zA-Z0-9 _-]+)$/) === -1) {
        catchErrors.workAddress = 'Field should be alphabets and numbers';
      }

      if (_validator["default"].isEmpty(workAddress)) {
        catchErrors.workAddress = 'Field cannot be Empty';
      }

      if (!_validator["default"].isLength(workAddress, {
        min: 10,
        max: 40
      })) {
        catchErrors.workAddress = 'workAddress length must be at least ten characters long';
      }

      if (!_validator["default"].isLength(lastName, {
        min: 2
      })) {
        catchErrors.lastName = 'Lastname length must be at least two characters long';
      }

      if (lastName.search(/^[a-zA-Z]*$/) === -1) {
        catchErrors.lastName = 'Lastname should only be Alphabets';
      }

      if (!_validator["default"].isEmail(email)) {
        catchErrors.email = 'Field must be an Email format';
      }

      if (!_validator["default"].isEmpty(password)) {
        if (!_validator["default"].isLength(password, {
          min: 6
        })) {
          catchErrors.password = 'Password length must be at least six characters long';
        }
      } else {
        catchErrors.password = 'Field cannot be Empty';
      }

      if (Object.keys(catchErrors).length != 0) {
        return res.status(400).json({
          catchErrors: catchErrors
        });
      }

      next();
    }
  }, {
    key: "signIn",
    value: function signIn(req, res, next) {
      var _req$body2 = req.body,
          email = _req$body2.email,
          password = _req$body2.password;
      var signErrors = {};

      if (email == undefined || password == undefined) {
        return res.status(422).json({
          status: 'Failed',
          message: 'All or some fields are empty'
        });
      }

      if (!_validator["default"].isEmail(email)) {
        signErrors.email = 'Field must be an Email format';
      }

      if (!_validator["default"].isAlpha(password)) {
        signErrors.password = 'Fields must alphabets';
      }

      if (!_validator["default"].isEmpty(password)) {
        if (!_validator["default"].isLength(password, {
          min: 6
        })) {
          signErrors.password = 'Password length must be at least six characters long';
        }
      } else {
        signErrors.password = 'Field cannot be Empty';
      }

      if (Object.keys(signErrors).length != 0) {
        return res.status(422).json({
          signErrors: signErrors
        });
      }

      next();
    }
  }]);

  return userValidator;
}();

var _default = new userValidator();

exports["default"] = _default;