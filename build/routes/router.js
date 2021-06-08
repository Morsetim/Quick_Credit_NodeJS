"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = _interopRequireDefault(require("../controllers/userController"));

var _uservalidation = _interopRequireDefault(require("../middlewares/uservalidation"));

var _loanController = _interopRequireDefault(require("../controllers/loanController"));

var _tokenAuthentication = _interopRequireDefault(require("../middlewares/tokenAuthentication"));

var _loanValidation = _interopRequireDefault(require("../middlewares/loanValidation"));

var _loanRepayment = _interopRequireDefault(require("../controllers/loanRepayment"));

var _checkAdmin = _interopRequireDefault(require("../controllers/helpers/checkAdmin"));

var _loanRepaymentValidation = _interopRequireDefault(require("../middlewares/loanRepaymentValidation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import checkIfVerify from '../controllers/helpers/checkVerify';
var router = _express["default"].Router(); // user route


router.route('/auth/signup').post(_uservalidation["default"].signUp, _userController["default"].signUp);
router.route('/auth/signin').post(_uservalidation["default"].signIn, _userController["default"].signIn);
router.route('/users/:useremail/verify').patch(_tokenAuthentication["default"], _checkAdmin["default"], _userController["default"].verified);
router.route('/users/:id').patch(_tokenAuthentication["default"], _checkAdmin["default"], _userController["default"].updateUserRole); // loans route

router.route('/loans').get(_tokenAuthentication["default"], _checkAdmin["default"], _loanController["default"].allLoans).post(_tokenAuthentication["default"], _loanValidation["default"].applyLoan, _loanController["default"].apply);
router.route('/loans/:loanId').get(_tokenAuthentication["default"], _loanController["default"].getOneLoan).patch(_tokenAuthentication["default"], _loanController["default"].approved);
router.route('/loans/user').get(_tokenAuthentication["default"], _loanController["default"].userLoanList);
router.route('/loans/repaid').get(_tokenAuthentication["default"], _checkAdmin["default"], _loanController["default"].repaidLoan);
router.route('/loans/unrepaid').get(_tokenAuthentication["default"], _checkAdmin["default"], _loanController["default"].unrepaidLoan);
router.route('/loans/:loanId/repayment').get(_tokenAuthentication["default"], _checkAdmin["default"], _loanRepayment["default"].repaymentHistory).post(_tokenAuthentication["default"], _checkAdmin["default"], _loanRepayment["default"].repaymentRecord, _loanRepaymentValidation["default"].postRepayment);
var _default = router;
exports["default"] = _default;