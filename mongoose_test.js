// Tämä on testitiedosto, joka lisää tietokantaan yhden muistiinpanon.
// Tämä tiedosto ei ole osa varsinaista sovellusta.

const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

// Käytetään toista palvelinta 
const url =
  `mongodb+srv://fullstack:${password}@cluster0.jxfp3.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`
//  `mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

// Muokataan tietokantakyselyä
const Note = mongoose.model('note', noteSchema)

// Uusi muistiinpano
// const note = new Note({
//   content: 'HTML is very, very easy',
//   important: true,
// })

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })

// Haetaan kaikki muistiinpanot
// Note.find({}).then(result => {
//   result.forEach(note => {
//     console.log(note)
//   })
//   mongoose.connection.close()
// })

// Haetaan tärkeät muistiinpanot
Note.find({ important: true }).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})