// This is a simple script to test the connection to your MongoDB cluster.
// You can run this script with the command `node mongo.js your_password`.
// Remember to replace your_password with your actual password.
// If you see the message "Pinged your deployment. You successfully connected to MongoDB!",
// you have successfully connected to your MongoDB cluster.
// If you see any error messages, please check your connection string and your MongoDB node version.
// This script uses the MongoDB Node.js Driver.
// To install the driver, use the following command:
// npm install mongodb
// For more information, see https://docs.mongodb.com/drivers/node

const { MongoClient, ServerApiVersion } = require('mongodb')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const uri = `mongodb+srv://fullstack:${password}@cluster0.jxfp3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect()
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 })
    console.log('Pinged your deployment. You successfully connected to MongoDB!')
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}
run().catch(console.dir)
