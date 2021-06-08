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

var postRepaymentValidator = /*#__PURE__*/function () {
  function postRepaymentValidator() {
    _classCallCheck(this, postRepaymentValidator);
  }

  _createClass(postRepaymentValidator, [{
    key: "postRepayment",
    value: function postRepayment(req, res, next) {
      var _req$body = req.body,
          loanId = _req$body.loanId,
          createdOn = _req$body.createdOn,
          amount = _req$body.amount,
          monthlyInstallment = _req$body.monthlyInstallment,
          balance = _req$body.balance;
      var fieldsErrors = {};

      if (loanId == undefined || createdOn == undefined || amount == undefined || monthlyInstallment == undefined || balance == undefined) {
        return res.status(400).json({
          status: 'Failed',
          message: 'All or some fields are empty'
        });
      }

      if (loanId.search(/^[0-9]*$/) === -1) {
        fieldsErrors.tenor = 'Please input numbers';
      }

      if (_validator["default"].toDate(createdOn)) {
        fieldsErrors.createdOn = 'Input a date format';
      }

      if (amount.search(/^[0-9]*$/) === -1) {
        fieldsErrors.amount = 'Please input numbers';
      }

      if (!_validator["default"].isLength(amount, {
        min: 4,
        max: 6
      })) {
        fieldsErrors.amount = 'Loans can only be 1000 above and 500,000 below';
      }

      if (monthlyInstallment.search(/^[0-9]*$/) === -1) {
        fieldsErrors.monthlyInstallment = 'Please input numbers';
      }

      if (!_validator["default"].isLength(monthlyInstallment, {
        min: 4,
        max: 6
      })) {
        fieldsErrors.monthlyInstallment = 'Loans can only be 1000 above and 500,000 below';
      }

      if (balance.search(/^[0-9]*$/) === -1) {
        fieldsErrors.balance = 'Please input numbers';
      }

      if (!_validator["default"].isLength(balance, {
        min: 4,
        max: 6
      })) {
        fieldsErrors.balance = 'Loans can only be 1000 above and 500,000 below';
      }

      if (Object.keys(fieldsErrors).length != 0) {
        return res.status(400).json({
          fieldsErrors: fieldsErrors
        });
      }

      next();
    }
  }]);

  return postRepaymentValidator;
}();

var _default = new postRepaymentValidator();

exports["default"] = _default;