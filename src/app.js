const express = require ('express');
const cors = require('cors');
const router = require('./routes/configR');
const app = express();

//settings
app.set('port',process.env.PORT || 4000);



//middlewares
app.use(cors());
app.use(express.json());

//routes
router(app);


module.exports = app ;