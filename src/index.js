const express = require('express');

const app = express();

const {PORT} = require('./constants');
const routes = require('./routes');
const { dbConfig } = require('./config/dbConfig')

//services
//global error handler
//add models
//authentication
//authorization

require('./config/expressConfig')(app);
require('./config/hbsConfig')(app);

app.use(routes);

dbConfig()
    .then(() => {
        app.listen(PORT, () => console.log(`The app is running on http://localhost:${PORT}`));
    })
    .catch(err => {
        console.log('Cannot connect DB: ', err);
    });
