const mongoose = require('mongoose')
const config = require('../../config/config')
mongoose
  .connect(config.mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('we are connected to Databse')
  })
