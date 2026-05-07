import { MongoClient } from "mongodb";


const url= "mongodb://127.0.0.1:27017";
const client= new MongoClient(url);

let db;

export default async function connectDB(){
    if(!db){
        await client.connect();
        console.log("Connected to mongoDB");
        db= client.db("bibliotecapp")
    }
    return db;
}