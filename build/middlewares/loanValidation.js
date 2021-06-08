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

var loanValidator = /*#__PURE__*/function () {
  function loanValidator() {
    _classCallCheck(this, loanValidator);
  }

  _createClass(loanValidator, [{
    key: "applyLoan",
    value: function applyLoan(req, res, next) {
      var _req$body = req.body,
          tenor = _req$body.tenor,
          amount = _req$body.amount;
      var fieldsErrors = {};

      if (tenor == undefined || amount == undefined) {
        return res.status(400).json({
          status: 'Failed',
          message: 'All or some fields are empty'
        });
      }

      if (_validator["default"].isEmpty(tenor)) {
        if (tenor.search(/^[0-9]*$/) === -1) {
          fieldsErrors.tenor = 'Please input number';
        }

        fieldsErrors.tenor = 'Tenor field cannot be empty';
      }

      if (_validator["default"].isEmpty(amount)) {
        if (amount.search(/^[0-9]*$/) === -1) {
          fieldsErrors.amount = 'Please input numbers';
        }

        fieldsErrors.amount = 'Amount field cannot be empty';
      }

      if (!_validator["default"].isLength(amount, {
        min: 4,
        max: 6
      })) {
        fieldsErrors.amount = 'We only grant a loans of 1000 above and 500,000 below';
      }

      if (Object.keys(fieldsErrors).length != 0) {
        return res.status(400).json({
          fieldsErrors: fieldsErrors
        });
      }

      next();
    }
  }]);

  return loanValidator;
}();

var _default = new loanValidator();

exports["default"] = _default;