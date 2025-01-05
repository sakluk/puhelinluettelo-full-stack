require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')
const requestLogger = require('./middleware/requestLogger')

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())
// Copilotin generoima koodi
// Määritellään morgan token, joka tulostaa pyynnön bodyn
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(requestLogger) // Lisätty virheidenkäsittelijä


app.get('/', (request, response) => {
  response.send('<h1>Se on moro!</h1>')
})

// Info-sivu
app.get('/info', (request, response) => {
  Person.find({}).then(persons => {
    response.send(`<p>Puhelinmuistiossa on ${persons.length} henkilön tiedot.</p>
      <p>${new Date()}</p>`)
  })
})


// Näytä kaikki henkilöt
app.get('/api/persons', (request, response) => {
  Person.find({}).then(person => {
    response.json(person)
  })
})

// Tarkastele yksittäistä henkilöä
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
  .then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

// Päivitä henkilön numero
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, 
    person, 
    { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})


// Lisää henkilö
app.post('/api/persons', (request, response, next) => {
  const body = request.body
  console.log('body', body)

  // Tarkistetaan onko nimi ja numero annettu
  if (!body.name) {
    return response.status(400).json({
      error: 'Nimi puuttuu'
    })
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'Numero puuttuu'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
  .catch(error => next(error))
})

// Poista henkilö
app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  //console.log('Poistettava id:', id)

  // Etsitään henkilö Id:n perusteella ja poistetaan
  Person.findByIdAndDelete(id)
  .then(result => {
    if (result) {
      response.status(204).end()
    }
  })
  .catch(error => next(error))
})

// olemattomien osoitteiden käsittely
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'tuntematon resurssi' })
}
app.use(unknownEndpoint)

// Virheidenkäsittelijä
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Virheellinen id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Palvelin palvelee portissa ${PORT}`)
})