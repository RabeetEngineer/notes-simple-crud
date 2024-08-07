// https://www.youtube.com/watch?v=jK7mcMrYzj8&list=PL-LRDpVN2fZA-1igOQ6PDcqfBjS-vaC7w&index=2

// Import dependencies
const express = require("express");
const connectToDb = require("./config/connectToDb");
const notesController = require("./controllers/notesController");
const bodyParser = require("body-parser");
const cors = require('cors');

// Create an express app
const app = express();

// Configure express app to parse JSON
app.use(express.json());
app.use(cors());

app.use(bodyParser.json());

// Connect to Database
connectToDb();


app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

// Define routes
app.get("/notes", notesController.fetchNotes);
app.get("/notes/:id", notesController.fetchNote);
app.post("/notes", notesController.createNote);
app.put("/notes/:id", notesController.updateNote );
app.delete("/notes/:id", notesController.deleteNote );

// Start our Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
