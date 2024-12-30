// mongo.js - yhteys mongDB tietokantaan
// Tämä skripti on tarkoitettu puhelintietojen tallentamiseen ja hakemiseen 
// MongoDB-tietokannasta.
// Skripti ottaa argumentteinaan salasanan, puhelinnumeron ja nimen.
// Jos argumentteja on 3, skripti hakee kaikki puhelinnumerot tietokannasta.
// Jos argumentteja on 5, skripti tallentaa uuden puhelinnumeron tietokantaan.
//
// Käyttö:
// node mongo.js salasana
// node mongo.js salasana "puhelinnumero" "nimi"
//
// Esimerkki tallennuksesta:
// node mongo.js salasana "040-1234567" "Arto Hellas"
//
// Esimerkki hakemisesta:
// node mongo.js salasana
//

const mongoose = require('mongoose')

// console.log(process.argv.length)
// console.log(process.argv)

if (process.argv.length < 3) {
    console.log('salasana puuttuu')
    console.log('kokeile: node mongo.js salasana')
    process.exit(1)
}
const password = process.argv[2]

// Yhdistä MongoDB-tietokantaan
const url =
    `mongodb+srv://fullstack:${password}@cluster0.jxfp3.mongodb.net/phonesApp?retryWrites=true&w=majority&appName=Cluster0`
mongoose.set('strictQuery', false)
mongoose.connection.on('connected', () => console.log('connected'));
mongoose.connection.on('open', () => console.log('open'));
mongoose.connection.on('disconnected', () => console.log('disconnected'));
mongoose.connection.on('reconnected', () => console.log('reconnected'));
mongoose.connection.on('disconnecting', () => console.log('disconnecting'));
mongoose.connection.on('close', () => console.log('close'));
mongoose.connect(url).catch(error => console.log('error', error));
// Wait for the connection to be established
console.log('mongoose.connection.readyState', mongoose.connection.readyState)
// Odota 10 sekuntia
setTimeout(() => {
    console.log('mongoose.connection.readyState', mongoose.connection.readyState)
}, 10000)



// Määritä tietokantataulu
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})
const Person = mongoose.model('person', personSchema)

// console.log('process.argv.length', process.argv.length, process.argv.length < 4)

// Haetaan kaikki numerot
if (process.argv.length < 4) {
    console.log('haetaan kaikki numerot')
    Person.find({}).then(result => {
            console.log('puhelinluettelo:')
            result.forEach(person => {
                console.log(person)
            })
            mongoose.connection.close()
            process.exit(0)
        })
    console.log('virhe haettaessa puhelinluetteloa.')
    process.exit(1)
}

// Uusi puhelinnumero
if (process.argv.length === 5) {
    console.log('tallennetaan uusi numero')
    const name = process.argv[3]
    const number = process.argv[4]
    console.log('name', name)
    console.log('number', number)


    const person = new Person({
        name: name,
        number: number,
    })

    person.save().then(result => {
        console.log('uusi numero tallennettu tietokantaan.')
        mongoose.connection.close()
        process.exit(0)
    })
    console.log('virhe tallennettaessa uutta numeroa.')
    mongoose.connection.close()
    process.exit(1)
}

console.log('tarkista syöte')
console.log('kokeile: node mongo.js salasana')
console.log('tai: node mongo.js salasana "Arto Hellas" "040-1234567"')
process.exit(1)

