const express = require('express')
const app = express()
const port = 3000

app.get('/login', (inianjing, res) => {
    x
    res.send('Hello W')
})

app.get('/random', (req, res) => {
    res.send({data: Math.random(5)})
})
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

