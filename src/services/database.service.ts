import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { products?: mongoDB.Collection } = {}

export async function connectToDatabase() {
    dotenv.config();
 
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.MONGO_URI || "mongodb://root:Start1234@mongo:27017");
            
    await client.connect();
        
    const db: mongoDB.Db = client.db(process.env.DB_NAME);
   
    const productsCollection: mongoDB.Collection = db.collection(process.env.COLL_NAME || "products");
 
  collections.products = productsCollection;
       
         console.log(`Successfully connected to database: ${db.databaseName} and collection: ${productsCollection.collectionName}`);
 }