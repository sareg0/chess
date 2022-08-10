const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs/promises')

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
  const gameId = 1
  try {
    fs.writeFile(`./data/${gameId}.json`, JSON.stringify(req.body))
  } catch(e) {
    console.error('error to post!:', e)
  }
  // console.log('POST res', res.body)
  res.json({
    data: {
      id: gameId
    },
    errors: 'nothing'
  })
})

app.listen(port, ()=>{
  console.log(`Example app listening on port ${port}`)
})
