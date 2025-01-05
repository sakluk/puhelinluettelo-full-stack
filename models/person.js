// Kopioitu tehtävän 3.13 mukaisesti mongo.js-tiedostosta ja
// muokattu vastaamaan tehtävän vaatimuksia.
require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URI

mongoose.connect(url)
  .then(() => {
    console.log('yhdistetty tietokantaan')
  })
  .catch((error) => {
    console.log('virhe tietokannan yhdistämisessä:', error.message)
  })

// Määritellään skeema
// Nimi ja numero ovat pakollisia, nimen tulee olla vähintään 3 merkkiä pitkä
// ja numeron vähintään 8 merkkiä pitkä ja sen tulee olla muotoa xx-xxxxxxx
// Numeron tarkistus on tehty regexillä ja se tarkistaa, että numero on muotoa
// xx-xxxxxxx, jossa x on numero. Tarkistus ei ole täydellinen, mutta se on riittävä
// tähän tehtävään. Kommentit ja numeron tarkistus on generoitu käyttäen Copilotia.
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'Nimen tulee olla vähintään 3 merkkiä pitkä'],
  },
  number: {
    type: String,
    validate: {
      validator: function(v) {
        return /^\d{2,3}-\d+$/.test(v)
      },
      message: props => `${props.value} ei ole kelvollinen puhelinnumero!`
    },
    minLength: [8, 'Numeron tulee olla vähintään 8 merkkiä pitkä'],
  },
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
