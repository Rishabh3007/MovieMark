// import { MongoClient, ServerApiVersion } from "mongodb";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
// console.log(process.env.ATLAS_URI);
const uri = process.env.ATLAS_URI;
mongoose.connect(uri).then(() => {
    console.log('Connected to Database');
}).catch((err) => {
    console.log('Failed to connect to Database');
    console.log(err); 
});
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

//     try {
//       // Connect the client to the server
//       await client.connect();
//       // Send a ping to confirm a successful connection
//       await client.db("admin").command({ ping: 1 });
//       console.log(
//        "Pinged your deployment. You successfully connected to MongoDB!"
//       );
//     } catch(err) {
//         console.error("Failed to connect to MongoDB",err);
//         throw err;
//     }
    
//     let db = client.db("moviemark");
// connectToDatabase().then(db => {
//     // You can now use the 'db' variable to interact with the 'employees' database
//     console.log("Database connection ready.");
//   }).catch(err => {
//     console.error("An error occurred while setting up the database connection", err);
//   });




//   export default db;