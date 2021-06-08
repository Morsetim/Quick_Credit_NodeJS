import express from 'express';
import userController from '../controllers/userController';
import userValidator from '../middlewares/uservalidation';
import loanController from '../controllers/loanController';
import authToken from '../middlewares/tokenAuthentication';
import loanValidator from '../middlewares/loanValidation';
import loanRepayments from '../controllers/loanRepayment';
import checkAdmin from '../controllers/helpers/checkAdmin';
import repaymentValidator from '../middlewares/loanRepaymentValidation';
import loanRepaymentValidation from '../middlewares/loanRepaymentValidation';
// import checkIfVerify from '../controllers/helpers/checkVerify';

const router = express.Router();

// user route
router.route('/auth/signup')
  .post(userValidator.signUp, userController.signUp);

router.route('/auth/signin')
  .post(userValidator.signIn, userController.signIn);

router.route('/users/:useremail/verify')
  .patch(authToken, checkAdmin, userController.verified);

router.route('/users/:id')
  .patch(authToken, checkAdmin, userController.updateUserRole);
// loans route
router.route('/loans')
  .get(authToken, checkAdmin, loanController.allLoans)
  .post(authToken, loanValidator.applyLoan, loanController.apply);

router.route('/loans/:loanId')
  .get(authToken, loanController.getOneLoan)
  .patch(authToken, loanController.approved)

router.route('/loans/user')
  .get(authToken, loanController.userLoanList)

router.route('/loans/repaid')
  .get(authToken, checkAdmin, loanController.repaidLoan)
router.route('/loans/unrepaid')
  .get(authToken, checkAdmin, loanController.unrepaidLoan);

router.route('/loans/:loanId/repayment')
  .get(authToken, checkAdmin, loanRepayments.repaymentHistory)
  .post(authToken, checkAdmin, loanRepayments.repaymentRecord, loanRepaymentValidation.postRepayment);


export default router;