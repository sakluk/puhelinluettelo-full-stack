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
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/', (request, response) => {
  response.send('<h1>Se on moro!</h1>')
})

// Info-sivu
// Copilotin generoima koodi
app.get('/info', (request, response) => {

  // Lue henkilöiden määrä
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
app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  }).
    catch(error => {
      console.log(error)
      response.status(404).end()
    })
})

// Lisätään henkilö
app.post('/api/persons', (request, response) => {
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
})

// Poistetaan henkilö
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  console.log('Poistettava id:', id)

  // Etsitään henkilö Id:n perusteella ja poistetaan
  Person.findByIdAndDelete(id)
  .then(result => {
    if (result) {
      response.status(204).end()
      console.log('Poistettu henkilö id:', id)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => {
    console.log(error)
    response.status(500).end()
  })
})


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Palvelin palvelee portissa ${PORT}`)
})