const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");

//route 1: get all the notes using: GET "api/notes/fetchAllNotes", login required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    //find the user using userid and fetch the notes of the user
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// route 2: Add a new note using: POST "api/notes/addnote". login required
router.post(
  "/addnote",
  fetchUser,
  //validators
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // note body
    try {
      const { title, description, tag } = req.body;
      //if there ar errors, return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //else create a new note
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      //save the note and send it as response
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// route 3:update a note using: POST "api/notes/updatenote", login required

router.put("/updatenote/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body; //destructing

  try {
    //create a newNote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //find the note to be updated and updating it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }
    // if the ids dont match
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    //if the above conditions are false i.e. note exists
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//route 4: delete an existing note: DELETE "api/notes/deletenote", Login required
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    //find the note to be updated and updating it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }
    //allow deletetion onlu if user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
