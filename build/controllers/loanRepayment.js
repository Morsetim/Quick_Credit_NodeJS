"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _db = _interopRequireDefault(require("../models/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LoanRepayment = /*#__PURE__*/function () {
  function LoanRepayment() {
    _classCallCheck(this, LoanRepayment);
  }

  _createClass(LoanRepayment, [{
    key: "repaymentHistory",
    value: function repaymentHistory(req, res) {
      var loanId = req.params.loanId;
      var userHistory = "SELECT * FROM loanrepayment WHERE id = $1";
      var params = [loanId];
      db.query(userHistory, params).then(function (loan) {
        return res.status(201).json({
          status: 201,
          data: {
            loanId: loan[0].id,
            createdOn: loan[0].createdOn,
            monthlyInstallment: loan[0].paymentInstallment,
            amount: loan[0].amount
          }
        });
      })["catch"](function (err) {
        return res.status(500).json({
          status: 'Failed',
          message: err.message
        });
      });
    }
  }, {
    key: "repaymentRecord",
    value: function repaymentRecord(req, res) {
      var _req$body = req.body,
          amount = _req$body.amount,
          monthlyInstallment = _req$body.monthlyInstallment,
          balance = _req$body.balance;
      var userId = req.params.userId;
      var loanId = req.params.loanId;
      var createdOn = Date();
      var sql = "INSERT INTO loanrepayment(userId, loanId, amount, monthlyInstallment, balance, createdOn) VALUES($1, $2, $3, $4) RETURNING *";
      var params = [userId, loanId, amount, monthlyInstallment, createdOn, balance];

      _db["default"].query(sql, params).then(function (repayment) {
        if (repayment) {
          return res.status(201).json({
            status: 201,
            data: [{
              loan: loan.rows[0]
            }]
          });
        }

        return res.status(422).json({
          status: 422,
          message: "User with id ".concat(userId, " and loanId ").concat(loanId, " Does not exist in your catalogue")
        });
      })["catch"](function (err) {
        return res.status(500).json({
          status: 'Failed',
          message: err.message
        });
      });
    }
  }]);

  return LoanRepayment;
}();

var _default = new LoanRepayment();

exports["default"] = _default;