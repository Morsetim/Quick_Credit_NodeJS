import validator from 'validator';


class userValidator{
    signUp(req, res, next){

        const {firstName, lastName, email, password, homeAddress, workAddress} = req.body;
        const catchErrors = {};

        if(firstName == undefined || lastName == undefined || email == undefined || password == undefined ||homeAddress == undefined || workAddress === undefined){
            return res.status(422).json({status:'Failed', message:'All or some fields are empty'});
        }
        if(!validator.isLength(firstName, {min:2})){
            catchErrors.firstName = 'First name length must be at least two characters long';
        }
        if(firstName.search(/^[a-zA-Z]*$/) === -1){
            catchErrors.firstName = 'Firstname should only be Alphabets';
        }
        if(homeAddress.search(/^([a-zA-Z0-9 _-]+)$/) === -1){
            catchErrors.homeAddress = 'Field should be alphabets and numbers';
        }   
        if(validator.isEmpty(homeAddress)){
            catchErrors.homeAddress = 'Field cannot be Empty';
            }
        if(!validator.isLength(homeAddress, {min:10, max:40})){
            catchErrors.homeAddress = 'homeAddress length must be at least ten characters long';
        }
        if(workAddress.search(/^([a-zA-Z0-9 _-]+)$/) === -1){
            catchErrors.workAddress = 'Field should be alphabets and numbers';
        }
        if(validator.isEmpty(workAddress)){
            catchErrors.workAddress = 'Field cannot be Empty';
            }
        if(!validator.isLength(workAddress, {min:10, max:40})){
            catchErrors.workAddress = 'workAddress length must be at least ten characters long';
        }
        if(!validator.isLength(lastName, {min:2})){
            catchErrors.lastName = 'Lastname length must be at least two characters long';
        }
        if(lastName.search(/^[a-zA-Z]*$/) === -1){
            catchErrors.lastName = 'Lastname should only be Alphabets';
        }
        if(!validator.isEmail(email)){
            catchErrors.email = 'Field must be an Email format';
        }
        if(!validator.isEmpty(password)){
            if(!validator.isLength(password, {min:6})){
                catchErrors.password = 'Password length must be at least six characters long';
            }
        }else{
            catchErrors.password = 'Field cannot be Empty';
        }
        if(Object.keys(catchErrors).length != 0){
            return res.status(400).json({catchErrors});
        }
        next();
}

    signIn(req, res, next){
        const {email, password} = req.body;
        let signErrors = {};
        if(email == undefined || password == undefined){
        return res.status(422).json({status:'Failed', message:'All or some fields are empty'}); 
        }
        if(!validator.isEmail(email)){
            signErrors.email = 'Field must be an Email format';
        }
        if(!validator.isAlpha(password)){
            signErrors.password = 'Fields must alphabets';
        }
        if(!validator.isEmpty(password)){
            if(!validator.isLength(password, {min:6})){
                signErrors.password = 'Password length must be at least six characters long';
            }
        }else{
            signErrors.password = 'Field cannot be Empty';
        }
        if(Object.keys(signErrors).length != 0){
            return res.status(422).json({signErrors});
        }
        next();
    }
}

export default new userValidator();         