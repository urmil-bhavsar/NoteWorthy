import React, { useContext, useState } from "react";
import noteContext from "../context/noteContext/NoteContext";
import AlertContext from "../context/alertContext/AlertContext";

export const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote, getNotes } = context;

  const alertContext = useContext(AlertContext)
  const { showAlert } = alertContext
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" })
    showAlert("Note added successfully", "success")
    // getNotes()
  };
  const onChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container w-50" >
      <h1 style={{ textAlign: "center" }}>Add a note</h1>
      <form className="my-3" onSubmit={e => handleSubmit(e)}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={note.title}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="desciption" className="form-label">
            Description
          </label>
          <textarea
            name="description"
            type="text"
            className="form-control"
            id="description"
            onChange={onChange}
            value={note.description}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={note.tag}
          />
        </div>

        <button
          type="submit"
          disabled={note.title.length < 5 || note.description.length < 5}
          className="btn btn-dark"
        // onClick={handleSubmit}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};
