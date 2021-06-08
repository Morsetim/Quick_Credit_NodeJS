import loansData from '../models/db';


class LoanController {

  /**
   *
   *
   * @param {obj} req
   * @param {obj} res
   * @memberof LoanController
   */
  apply(req, res) {
    const { tenor, amount } = req.body;
    const interest = Number(amount) * (5 / 100);
    const principal = + Number(amount) + Number(interest);
    const paymentInstallment = Number(principal) / Number(tenor);
    const balance = amount;
    const { userId } = req.decoded;

    loansData.query(`SELECT balance FROM loans where userId = '${userId}' `).then((loanFound) => {
      if (loanFound.rowCount > 0) {
        const recentLoanBalance = loanFound.rows[loanFound.rows.length - 1].balance;
        if (recentLoanBalance !== 0) {
          return res.status(400)
            .json({
              message: 'You not permitted to apply for this loan, pay your pending debt',
              debt: recentLoanBalance
            });
        }
      }

      const sql = 'INSERT INTO loans( tenor, amount, paymentInstallment, balance, interest, userId) VALUES($1, $2, $3, $4, $5,$6) RETURNING *';
      const params = [parseInt(tenor), parseInt(amount), parseInt(paymentInstallment), parseInt(balance), parseInt(interest), userId];
      loansData.query(sql, params).then(loan => {
        return res.status(201)
          .json({
            status: 201,
            data: loan.rows[0]
          });
      }).catch(e => console.log(e));
    }).catch(err => res.status(500).json({ status: 'Failed', message: err.message }));

  }
  /**
   *
   * 
   * @param {obj} req
   * @param {obj} res
   * @memberof LoanController
   */
  userLoanList(req, res) {
    const { userId } = req.decoded;

    const sql = `SELECT * FROM loans WHERE userId = ${userId}`
    loansData.query(sql).then(loan => {
    }).catch(err => res.status(500).json({ status: 'Failed', message: err.message }))
  }

  /**
     *
     * 
     * @param {obj} req
     * @param {obj} res
     * @memberof LoanController
     */
  allLoans(req, res) {
    const sql = `SELECT * FROM loans`
    loansData.query(sql).then(loan => {
      return res.status(201)
        .json({
          status: 201,
          data: [
            {
              allLoan: loan.rows
            }
          ]
        });
    }).catch(err => res.status(500).json({ status: 'Failed', message: err.message }))
  }

  /**
   *
   *
   * @param {*} req
   * @param {*} res
   * @memberof LoanController
   */
  getOneLoan(req, res) {
    const loanId = req.params;
    const sql = `SELECT * FROM loans WHERE id=${loanId}`
    loansData.query(sql).then(loan => {
      if (loan) {
        return res.status(201)
          .json({
            status: 201,
            data: [
              {
                specificLoan: loan
              }
            ]
          });
      } else {
        return res.status(400)
          .json({
            status: 400,
            message: `loan with id ${loan} does not exist in your catalogue`
          });
      }
    }).catch(err => res.status(500).json({ status: 'Failed', message: err.message }))
  }
  unrepaidLoan(req, res) {

    const sql = `SELECT FROM loans WHERE status=$1 AND repaid=$2`
    const params = ['approved', 'false'];
    loansData.query(sql, params).then(unrepaid => {
      if (unrepaid) {
        return res.status(201)
          .json({
            status: 201,
            message: 'All unrepaid loans',
            unrepaid: unrepaid
          });
      }
      return res.status(400)
        .json({
          status: 400,
          message: 'No unrepaid loans'
        });
    }).catch(err => res.status(500).json({ status: 'Failed', message: err.message }))
  }
  /**
   *
   *
   * @param {*} req
   * @param {*} res
   * @memberof LoanController
   */
  repaidLoan(req, res) {

    const sql = `SELECT FROM loans WHERE status=$1 AND repaid=$2 AND balance=$3`
    const params = ['approved', 'true', 0];
    loansData.query(sql, params).then(repaid => {
      if (repaid) {
        return res.status(201)
          .json({
            status: 201,
            message: 'All repaid loans',
            repaid: repaid
          });
      }
      return res.status(400)
        .json({
          status: 400,
          message: 'No repaid loans'
        });
    }).catch(err => res.status(500).json({ status: 'Failed', message: err.message }))
  }

  approved(req, res) {
    const { loanId } = req.params;
    const userProfile = `UPDATE loans SET status =$1 WHERE id = $2 RETURNING *`;
    const params = ['approved', loanId];
    loansData.query(userProfile, params).then(loan => {
      return res.status(201)
        .json({
          status: 201,
          data: loan.rows[0]
        });
    }).catch(err => res.status(500).json({ status: 'Failed', message: err.message }))
  }

}

export default new LoanController();