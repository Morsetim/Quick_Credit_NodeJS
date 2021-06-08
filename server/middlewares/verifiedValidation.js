class verifiedValidator{
    verify(req, res, next){
        const {status} = req.body;
        const getErrors = {};
        if(status === undefined){
            return res.status(400).json({status:'Failed', message:'This fields cannot be empty'});
        }
        if(status === " "){
            getErrors.status = "This field is Empty "
        }
        if(status != "verified"){
            getErrors.status = 'Invalid: Please make sure the user is verified';
        }
        if(Object.keys(getErrors).length != 0){
            return res.status(422).json({getErrors});
        }
        next();
    }
    
}

export default new verifiedValidator();