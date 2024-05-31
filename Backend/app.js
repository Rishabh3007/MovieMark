import express from 'express';
import cors from "cors";
import "./db/connection.js"
import User from './models/userSchema.js';

const app = express();

// Define a port to listen on
const port = process.env.PORT;

app.use(cors());

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const user = new User({ name:"rishabh", email:"rjmail.com", phoneNumber:1234567890, password:"password" });
    await user.save();

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});