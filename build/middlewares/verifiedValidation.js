"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var verifiedValidator = /*#__PURE__*/function () {
  function verifiedValidator() {
    _classCallCheck(this, verifiedValidator);
  }

  _createClass(verifiedValidator, [{
    key: "verify",
    value: function verify(req, res, next) {
      var status = req.body.status;
      var getErrors = {};

      if (status === undefined) {
        return res.status(400).json({
          status: 'Failed',
          message: 'This fields cannot be empty'
        });
      }

      if (status === " ") {
        getErrors.status = "This field is Empty ";
      }

      if (status != "verified") {
        getErrors.status = 'Invalid: Please make sure the user is verified';
      }

      if (Object.keys(getErrors).length != 0) {
        return res.status(422).json({
          getErrors: getErrors
        });
      }

      next();
    }
  }]);

  return verifiedValidator;
}();

var _default = new verifiedValidator();

exports["default"] = _default;