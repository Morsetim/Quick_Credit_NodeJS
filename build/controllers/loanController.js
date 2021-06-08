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

var LoanController = /*#__PURE__*/function () {
  function LoanController() {
    _classCallCheck(this, LoanController);
  }

  _createClass(LoanController, [{
    key: "apply",
    value:
    /**
     *
     *
     * @param {obj} req
     * @param {obj} res
     * @memberof LoanController
     */
    function apply(req, res) {
      var _req$body = req.body,
          tenor = _req$body.tenor,
          amount = _req$body.amount;
      var interest = Number(amount) * (5 / 100);
      var principal = +Number(amount) + Number(interest);
      var paymentInstallment = Number(principal) / Number(tenor);
      var balance = amount;
      var userId = req.decoded.userId;

      _db["default"].query("SELECT balance FROM loans where userId = '".concat(userId, "' ")).then(function (loanFound) {
        if (loanFound.rowCount > 0) {
          var recentLoanBalance = loanFound.rows[loanFound.rows.length - 1].balance;

          if (recentLoanBalance !== 0) {
            return res.status(400).json({
              message: 'You not permitted to apply for this loan, pay your pending debt',
              debt: recentLoanBalance
            });
          }
        }

        var sql = 'INSERT INTO loans( tenor, amount, paymentInstallment, balance, interest, userId) VALUES($1, $2, $3, $4, $5,$6) RETURNING *';
        var params = [parseInt(tenor), parseInt(amount), parseInt(paymentInstallment), parseInt(balance), parseInt(interest), userId];

        _db["default"].query(sql, params).then(function (loan) {
          return res.status(201).json({
            status: 201,
            data: loan.rows[0]
          });
        })["catch"](function (e) {
          return console.log(e);
        });
      })["catch"](function (err) {
        return res.status(500).json({
          status: 'Failed',
          message: err.message
        });
      });
    }
    /**
     *
     * 
     * @param {obj} req
     * @param {obj} res
     * @memberof LoanController
     */

  }, {
    key: "userLoanList",
    value: function userLoanList(req, res) {
      var userId = req.decoded.userId;
      var sql = "SELECT * FROM loans WHERE userId = ".concat(userId);

      _db["default"].query(sql).then(function (loan) {})["catch"](function (err) {
        return res.status(500).json({
          status: 'Failed',
          message: err.message
        });
      });
    }
    /**
       *
       * 
       * @param {obj} req
       * @param {obj} res
       * @memberof LoanController
       */

  }, {
    key: "allLoans",
    value: function allLoans(req, res) {
      var sql = "SELECT * FROM loans";

      _db["default"].query(sql).then(function (loan) {
        return res.status(201).json({
          status: 201,
          data: [{
            allLoan: loan.rows
          }]
        });
      })["catch"](function (err) {
        return res.status(500).json({
          status: 'Failed',
          message: err.message
        });
      });
    }
    /**
     *
     *
     * @param {*} req
     * @param {*} res
     * @memberof LoanController
     */

  }, {
    key: "getOneLoan",
    value: function getOneLoan(req, res) {
      var loanId = req.params;
      var sql = "SELECT * FROM loans WHERE id=".concat(loanId);

      _db["default"].query(sql).then(function (loan) {
        if (loan) {
          return res.status(201).json({
            status: 201,
            data: [{
              specificLoan: loan
            }]
          });
        } else {
          return res.status(400).json({
            status: 400,
            message: "loan with id ".concat(loan, " does not exist in your catalogue")
          });
        }
      })["catch"](function (err) {
        return res.status(500).json({
          status: 'Failed',
          message: err.message
        });
      });
    }
  }, {
    key: "unrepaidLoan",
    value: function unrepaidLoan(req, res) {
      var sql = "SELECT FROM loans WHERE status=$1 AND repaid=$2";
      var params = ['approved', 'false'];

      _db["default"].query(sql, params).then(function (unrepaid) {
        if (unrepaid) {
          return res.status(201).json({
            status: 201,
            message: 'All unrepaid loans',
            unrepaid: unrepaid
          });
        }

        return res.status(400).json({
          status: 400,
          message: 'No unrepaid loans'
        });
      })["catch"](function (err) {
        return res.status(500).json({
          status: 'Failed',
          message: err.message
        });
      });
    }
    /**
     *
     *
     * @param {*} req
     * @param {*} res
     * @memberof LoanController
     */

  }, {
    key: "repaidLoan",
    value: function repaidLoan(req, res) {
      var sql = "SELECT FROM loans WHERE status=$1 AND repaid=$2 AND balance=$3";
      var params = ['approved', 'true', 0];

      _db["default"].query(sql, params).then(function (repaid) {
        if (repaid) {
          return res.status(201).json({
            status: 201,
            message: 'All repaid loans',
            repaid: repaid
          });
        }

        return res.status(400).json({
          status: 400,
          message: 'No repaid loans'
        });
      })["catch"](function (err) {
        return res.status(500).json({
          status: 'Failed',
          message: err.message
        });
      });
    }
  }, {
    key: "approved",
    value: function approved(req, res) {
      var loanId = req.params.loanId;
      var userProfile = "UPDATE loans SET status =$1 WHERE id = $2 RETURNING *";
      var params = ['approved', loanId];

      _db["default"].query(userProfile, params).then(function (loan) {
        return res.status(201).json({
          status: 201,
          data: loan.rows[0]
        });
      })["catch"](function (err) {
        return res.status(500).json({
          status: 'Failed',
          message: err.message
        });
      });
    }
  }]);

  return LoanController;
}();

var _default = new LoanController();

exports["default"] = _default;