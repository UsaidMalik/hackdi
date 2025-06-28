import { MongoClient, ServerApiVersion } from "mongodb";


const uri = process.env.MONGODB_URI as string
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

await client.connect();
// Send a ping to confirm a successful connection
await client.db("admin").command({ ping: 1 });
console.log("Pinged your deployment. You successfully connected to MongoDB!");

const db = await client.db('mqt3'); // replace with your database nameexport 

export {db};