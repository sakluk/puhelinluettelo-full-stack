// Kopioitu tehtävän 3.13 mukaisesti mongo.js-tiedostosta ja
// muokattu vastaamaan tehtävän vaatimuksia.
require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URI

mongoose.connect(url)
    .then(result => {
        console.log('yhdistetty tietokantaan')
    })
        .catch((error) => {
        console.log('virhe tietokannan yhdistämisessä:', error.message)
    })


const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

// Lisätään toJSON-metodi, joka muokkaa _id:n ja __v:n
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('person', personSchema)
