// Tämä on testitiedosto, joka lisää tietokantaan yhden muistiinpanon.
// Tämä tiedosto ei ole osa varsinaista sovellusta.

const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('salasana puuttuu')
  console.log('kokeile: node mongo.js salasana')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.jxfp3.mongodb.net/phonesApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('person', personSchema)

// Näytä kaikki numerot
if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('puhelinluettelo:')
    result.forEach(person => {
      const name = person.name
      const number = person.number
      console.log(`${name} ${number}`)
    })
    mongoose.connection.close()
  })
  return
}

// Lisää uusi numero
if (process.argv.length === 5) {
  
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(result => {
    console.log(`lisätty ${name} numero ${number} puhelinluetteloon`)
    mongoose.connection.close()
  })
  return
}