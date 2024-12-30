require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())

// Copilotin generoima koodi
// Määritellään morgan token, joka tulostaa pyynnön bodyn
// Lisätietoja:
// https://github.com/expressjs/morgan#creating-new-tokens
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-999321",
      "id": "1"
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": "2"
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": "3"
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": "4"
    }
]

app.get('/', (request, response) => {
  response.send('<h1>Se on moro!</h1>')
})

// Copilotin generoima koodi
app.get('/info', (request, response) => {
    response.send(`<p>Puhelinmuistiossa on ${persons.length} henkilön tiedot.</p>
    <p>${new Date()}</p>`)
  })


app.get('/api/persons', (request, response) => {
     
    Note.find({}).then(notes => {
      response.json(notes)
    })
  })

// Tarkastele yksittäistä henkilöä
  app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })   
})

// Lisätään henkilö
app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log('body', body)
        
    if (body.content === undefined  || body.content === '') {
        return response.status(400).json({
        error: 'sisältö puuttuu' })
    }

    // Tarkistetaan onko nimi ja numero annettu
    if (!body.name) {
        return response.status(400).json({
            error: 'Nimi puuttuu' })
    }

    if (!body.number) {
        return response.status(400).json({
            error: 'Numero puuttuu' })
    }

    // Vanha Copilotin generoima koodi
    // Tarkistetaan onko nimi jo olemassa
    // const nameExists = persons.find(x => x.name === body.name)
    // if (nameExists) {
    //     return response.status(400).json({
    //         error: 'Nimi on jo olemassa'
    //     })
    // }

    // Uusi koodi
    const person = new Person({
      name: body.name,  
      number: body.number,
    })

    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
})

// Poistetaan henkilö
app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(x => x.id !== id)

    response.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Palvelin palvelee portissa ${PORT}`)
})