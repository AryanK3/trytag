import {MongoClient} from "mongodb";
const uri=MONGO;
const client=new MongoClient(uri)
const clientPromise=client.connect()
export default clientPromise