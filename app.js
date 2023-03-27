require('dotenv').config()
require('./src/db/mongoose')
const express = require('express')
const app = express()
const config = require('./config/config')
const PORT = config.port || 3000
const path = require('path')
const pageRouter = require('./src/routes/page.route')
const userRouter = require('./src/routes/user.route')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(morgan('dev'))
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false
  })
)
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/images', express.static(path.join(__dirname, 'images')))

app.use(pageRouter)
app.use('/api/v1', userRouter)

app.listen(PORT, () => {
  console.log(`we are listing at port ${PORT}`)
})
