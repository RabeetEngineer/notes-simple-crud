const Note = require('../models/note')
const mongoose = require('mongoose');

// Getting the notes
const fetchNotes = async (req, res) => {
  try {
    // Find the notes
    const notes = await Note.find();
    // Respond with them
    res.status(200).json({ notes });
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ error: "An error occurred while fetching notes" });
  }
};

// fetch a note by ID
const fetchNote = async (req, res) => {
    try {
      const noteId = req.params.id;
      const note = await Note.findById(noteId);
      if (!note) {
        return res.status(404).json({ error: "Note not found" });
      }
      res.status(200).json({ note });
    } catch (error) {
      console.error("Error fetching note:", error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching the note" });
    }
  };

  // create a note
  const createNote = async (req, res) => {
    try {
      // Get the sent in data off request body
      const {title,body} = req.body;
  
      // Create a note with it
      const note = await Note.create({
        title,
        body,
      });
  
      // Respond with the new note
      res.status(201).json({ note });
    } catch (error) {
      // Handle any errors
      res
        .status(500)
        .json({ error: "An error occurred while creating the note" });
    }
  };

  // update note
  const updateNote = async (req, res) => {
    try {
      // Get the id from the URL
      const noteId = req.params.id;
  
      // Get the data from the request body
      const {title, body} = req.body;
  
      // Find and update the record
      const note = await Note.findByIdAndUpdate(
        noteId,
        {
          title,
          body,
        },
        { new: true }
      ); // This option returns the updated document
  
      // Check if note was found and updated
      if (!note) {
        return res.status(404).json({ error: "Note not found" });
      }
  
      // Respond with the updated note
      res.json({ note });
    } catch (error) {
      // Handle any errors that occurred during the update
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  // Delete Note
  const deleteNote = async (req, res) => {
    try {
      // get id of the url
      const noteId = req.params.id;
  
      // Validate objectId
      if(!mongoose.Types.ObjectId.isValid(noteId)) {
          return res.status(400).json({error: "Invalid ID"});
      }
  
      // delete the record
      const result = await Note.deleteOne({ _id: noteId });
  
      // check if any document was deleted
      if(result.deletedCount === 0) {
          return res.status(400).json({error: "Record not found"});
      }
  
      // respond
      res.json({ success: "Record deleted" });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({error: "Internal Server error"});
    }
  };

  module.exports = {
    fetchNotes,
    fetchNote,
    createNote,
    updateNote,
    deleteNote,
  }