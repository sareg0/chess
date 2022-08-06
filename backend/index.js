const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const port = 8080

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.set({
    'Access-Control-Allow-Origin': 'http://localhost:3000',
  })
  res.send('Hello World')
})

app.post('/', (req, res) => {
  res.set({
    'Access-Control-Allow-Origin': 'http://localhost:3000',
  })
  console.log('POST req', req.body)
  // console.log('POST res', res.body)
  res.json({
    data: 'bleepbloop',
    errors: 'nothing'
  })
})

app.listen(port, ()=>{
  console.log(`Example app listening on port ${port}`)
})
