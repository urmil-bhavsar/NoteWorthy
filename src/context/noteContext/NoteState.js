import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // get all notes
  const getNotes = async () => {
    //  api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        //"auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViNjU3ODU5NjgzYjlmZGI1NDI5MGIyIn0sImlhdCI6MTcwNjQ0OTE0M30.R1fKj1sxpbumLYcUS7g3JG6keiKYOymmRbl9n3IhRjo",
        "auth-token": localStorage.getItem("token"),
        'Content-Type': "application/json"
      },

    })
    const json = await response.json()
    console.log(json)
    setNotes(json)

  };

  // add a note
  const addNote = async (title, description, tag) => {
    console.log("adding a new note");
    // todo api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("token"),
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ title, description, tag })
    })
    const note = response.json()

    setNotes(notes.concat(note));
    getNotes() //notes.concat will return a new array wherease push updates an array
  };

  //delete a note
  const deleteNote = async (id) => {

    //  API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "auth-token": localStorage.getItem("token"),
        'Content-Type': "application/json"
      },
    })
    const json = response.json()
    console.log(json)

    console.log("deleting a note with id:" + id)
    const newNotes = notes.filter((note) => {
      return note._id !== id //keep the notes which are not equal to the id
    })
    setNotes(newNotes)
  };

  //edit a note
  const editNote = async (id, title, description, tag) => {
    // api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "auth-token": localStorage.getItem("token"),
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ title, description, tag })
    })
    const json = await response.json()
    console.log("jsonnnnn", json)

    let newNotes = JSON.parse(JSON.stringify(notes))
    // logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      // const index = notes.findIndex((note) => note._id == id)
      // console.log("indexxx", index)
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description
        newNotes[index].tag = tag
        break;
      }
    }
    setNotes(newNotes)
  };


  return (
    //noteContext will provide this state to all notes
    <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
