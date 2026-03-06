//const dns = require('dns')
//dns.setServers(['8.8.8.8'])

const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password (and optionally name and phonenumber) as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://ottovayrynen_db_user:${password}@cluster0.vgl8iax.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 3) {
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}

else if(process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}