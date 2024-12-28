const express = require('express')
const app = express()

app.use(express.json())

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

// Copilotin genroima koodi
app.get('/info', (request, response) => {
    response.send(`<p>Puhelinmuistiossa on ${persons.length} henkilön tiedot.</p>
    <p>${new Date()}</p>`)
  })

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(x => x.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => Number(n.id)))
        : 0
    return String(maxId + 1)
}
  
app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({
            error: 'Sisältö puuttuu'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    persons = persons.concat(person)

    response.json(person)
})

app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(x => x.id !== id)

    response.status(204).end()
  })

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Palvelin palvelee portissa ${PORT}`)
})