const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.set('views', 'views')

app.listen(PORT, () => {
  console.log(`we are listing at port ${PORT}`)
})
