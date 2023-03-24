const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const path = require('path')

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))

app.get('/home', (req, res) => {
  res.render('index')
})
app.get('/about', (req, res) => {
  res.render('about')
})
app.get('/services', (req, res) => {
  res.render('services')
})
app.get('/categories', (req, res) => {
  res.render('categories')
})
app.get('/login', (req, res) => {
  res.render('login')
})
app.get('/register', (req, res) => {
  res.render('register')
})
app.get('/', (req, res) => {
  res.render('index')
})
app.listen(PORT, () => {
  console.log(`we are listing at port ${PORT}`)
})
