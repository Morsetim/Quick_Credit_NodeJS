import validator from 'validator';

class loanValidator {
    applyLoan(req, res, next) {

        const { tenor, amount } = req.body
        const fieldsErrors = {};

        if (tenor == undefined || amount == undefined) {
            return res.status(400).json({ status: 'Failed', message: 'All or some fields are empty' });
        }
    
        if (validator.isEmpty(tenor)) {
            if (tenor.search(/^[0-9]*$/) === -1) {
                fieldsErrors.tenor = 'Please input number';
            }
            fieldsErrors.tenor = 'Tenor field cannot be empty';
        }
        if (validator.isEmpty(amount)) {
            if (amount.search(/^[0-9]*$/) === -1) {
                fieldsErrors.amount = 'Please input numbers';
            }
            fieldsErrors.amount = 'Amount field cannot be empty';
        }
        if (!validator.isLength(amount, { min: 4, max: 6 })) {
            fieldsErrors.amount = 'We only grant a loans of 1000 above and 500,000 below';
        }
        if (Object.keys(fieldsErrors).length != 0) {
            return res.status(400).json({ fieldsErrors });
        }
        next();
    }
}

export default new loanValidator();