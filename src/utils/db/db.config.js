import { MongoClient, ServerApiVersion } from "mongodb";

// const uri = 'mongodb://127.0.0.1:27017'
const uri = 'mongodb+srv://shubhamk28:Shubham1234567@cluster0.w5z6khr.mongodb.net/ele-allot?retryWrites=true&w=majority';

export const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

export const database = client.db("ele-allot");

export const connectDB = async () => {
  try{
    await client.connect();
  }catch(e){
    console.log(e);
  }
}

export const closeDB = async () => {
  try{
    await client.close();
  }catch(e){
    console.log(e);
  }
}

export default client;