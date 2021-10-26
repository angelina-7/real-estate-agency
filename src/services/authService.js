const jwt = require('../utils/jwt');
const User = require('../models/User');
const {TOKEN_SECRET} = require('../constants');


exports.login = async ({username, password}) => {
    let user = await User.findOne({username});

    if (!user){
        throw new Error('Invalid username or password');
    }

    let isValid = await user.validatePassword(password);

    if(!isValid){
        throw new Error('Invalid username or password');
    }

    let payload = {
        _id: user._id, 
        name: user.name,
        username: user.username,
    };

    let token = await jwt.sign(payload, TOKEN_SECRET);

    return token;

};

exports.register = (userData) => {
    return User.create(userData);
};

exports.validateFullName = (name) => {
    let fullname = name.split(/\s+/);
    console.log(fullname);
    if (fullname.length != 2){
        return null;
    } else {
        fullname[0] = fullname[0].charAt(0).toUpperCase() + fullname[0].substring(1,fullname[0].length-1).toLowerCase();
        fullname[1] = fullname[1].charAt(0).toUpperCase() + fullname[1].substring(1,fullname[1].length-1).toLowerCase();

        return fullname[0] + ' ' + fullname[1];
    }
}

exports.validatePassword = (pass, repPass) => {
    if (pass !== repPass) {
        return null;
    }
    return 'valid';
};
