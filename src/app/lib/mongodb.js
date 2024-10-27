import {MongoClient} from "mongodb";
const uri=<myuri>;
const client=new MongoClient(uri)
const clientPromise=client.connect()
export default clientPromise