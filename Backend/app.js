import express from 'express';
import cors from "cors";
import "./db/connection.js"
import authRouter from './routes/auth.js';
import playlistRouter from './routes/playlist.js'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const app = express();

// Define a port to listen on
const port = process.env.PORT;

app.use(cors({
  origin: "https://movie-mark-frontend.vercel.app", // Your frontend origin https://movie-mark-frontend.vercel.app
  credentials: true
}));

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Use the router
app.use(authRouter);
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use(playlistRouter);



app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});