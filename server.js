const express = require('express')
const app = express()
app.use(express.static('public'))

app.use(express.static('public'))

app.listen(process.env. Port || 8080, () => console.log('ALL is well!'))