import loansData from '../models/db';


class LoanRepayment{
  repaymentHistory(req, res){
    const {loanId} = req.params;
    const userHistory = `SELECT * FROM loanrepayment WHERE id = $1`;
    const params = [loanId];
    db.query(userHistory, params).then(loan => {
      return res.status(201)
         .json({
             status:201,
             data  :  {
                        loanId : loan[0].id,
                        createdOn : loan[0].createdOn,
                        monthlyInstallment : loan[0].paymentInstallment,
                        amount : loan[0].amount
                    }
         });
    }).catch(err =>res.status(500).json({status: 'Failed', message:err.message}))
  }


  repaymentRecord(req, res){
    const {amount, monthlyInstallment, balance} = req.body;
    const {userId} = req.params;
    const {loanId} = req.params;
    const createdOn = Date();

    const sql = `INSERT INTO loanrepayment(userId, loanId, amount, monthlyInstallment, balance, createdOn) VALUES($1, $2, $3, $4) RETURNING *`;
    const params = [userId, loanId, amount, monthlyInstallment, createdOn, balance];
    loansData.query(sql, params).then(repayment =>{
      if(repayment){
      return res.status(201)
          .json({
            status: 201,
            data: [
              {
                loan: loan.rows[0]
              }
            ]
          });
        }
      return res.status(422)
          .json({
            status: 422,
            message : `User with id ${userId} and loanId ${loanId} Does not exist in your catalogue`
          })
    }).catch(err => res.status(500).json({ status: 'Failed', message: err.message }));

}
}

export default new LoanRepayment();