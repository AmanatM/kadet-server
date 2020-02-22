const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS

app.use(cors())


app.use(express.static(path.join(__dirname, 'build')))
app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/], 301))


let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2019-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2019-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2019-05-30T19:20:14.298Z",
      important: true
    }
]


app.get('/api/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})


app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = +request.params.id
    const note = notes.find(note => note.id === id)
    if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
})


app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/build/index.html'))
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)
  

  
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})