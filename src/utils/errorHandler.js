exports.getErrorMessage = function (error){
    if (error?.errors){
        let errorNames = Object.keys(error?.errors);
        return error.errors[errorNames[0]];
    } else {
        return error.message;
    }
}