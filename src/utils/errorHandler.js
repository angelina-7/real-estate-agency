exports.getErrorMessage = function (error, res){
    let errorNames = Object.keys(error.errors);

    if (errorNames.length > 0){
        // res.locals.error = error._message + '. '+ error.errors[errorNames[0]];
        return error._message + '. '+ error.errors[errorNames[0]];
    } else {
        return error._message;
    }
}