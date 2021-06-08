import validator from 'validator';


class postRepaymentValidator{
    postRepayment(req, res, next){
        const {loanId, createdOn, amount, monthlyInstallment, balance} = req.body
        const fieldsErrors = {};

        if(loanId == undefined || createdOn == undefined || amount == undefined || monthlyInstallment == undefined || balance == undefined){
            return res.status(400).json({status:'Failed', message:'All or some fields are empty'});
    }
    if(loanId.search(/^[0-9]*$/) === -1){
        fieldsErrors.tenor = 'Please input numbers';
    }
    if(validator.toDate(createdOn)){
        fieldsErrors.createdOn = 'Input a date format';
    }
    if(amount.search(/^[0-9]*$/) === -1){
        fieldsErrors.amount = 'Please input numbers';
    }
    if(!validator.isLength(amount, {min:4, max:6})){
        fieldsErrors.amount = 'Loans can only be 1000 above and 500,000 below';
    }
    if(monthlyInstallment.search(/^[0-9]*$/) === -1){
        fieldsErrors.monthlyInstallment = 'Please input numbers';
    }
    if(!validator.isLength(monthlyInstallment, {min:4, max:6})){
        fieldsErrors.monthlyInstallment = 'Loans can only be 1000 above and 500,000 below';
    }
    if(balance.search(/^[0-9]*$/) === -1){
        fieldsErrors.balance = 'Please input numbers';
    }
    if(!validator.isLength(balance, {min:4, max:6})){
        fieldsErrors.balance = 'Loans can only be 1000 above and 500,000 below';
    }
    if(Object.keys(fieldsErrors).length != 0){
        return res.status(400).json({fieldsErrors});
    }
    next();

    }
}

export default new postRepaymentValidator();
