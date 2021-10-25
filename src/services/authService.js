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
