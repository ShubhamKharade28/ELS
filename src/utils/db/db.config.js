import { MongoClient, ServerApiVersion } from "mongodb";

// export const connectionStr = process.env.connectionStr;
const uri = 'mongodb+srv://shubhamk28:Shubham1234567@cluster0.w5z6khr.mongodb.net/ele-allot?retryWrites=true&w=majority';

export const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

export const database = await client.db("ele-allot");

export default client;