const User = require('../models/User');

exports.login = async ({username, password}) => {
    let user = await User.findOne({username});

    if (!user){
        throw new Error('Invalid username or password');
    }

    let isValid = await user.validatePassword(password);

    if(!isValid){
        throw new Error('Invalid username or password');
    }

    
};

exports.register = (userData) => {
    User.create(userData);
};

//todo create token