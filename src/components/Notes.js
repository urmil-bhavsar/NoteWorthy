import React, { useState, useContext, useEffect, useRef } from "react";
import noteContext from "../context/noteContext/NoteContext";
import { NoteItem } from "./NoteItem";
import { AddNote } from "./AddNote";
import AlertContext from "../context/alertContext/AlertContext";
import { useNavigate } from "react-router-dom";

export const Notes = ({ showAlert }) => {
  const navigate = useNavigate()
  const context = useContext(noteContext);
  const { notes, getNotes, addNote, editNote } = context;

  // console.log("notes", notes)
  const context2 = useContext(AlertContext)
  // const { showAlert } = context2

  useEffect(() => {
    if (localStorage.getItem("token")) {

      getNotes()
    } else {
      navigate("/login")
    }

  }, [])

  const ref = useRef(null)
  const refClose = useRef(null)
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    // console.log("current", currentNote)
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
  }

  const handleSubmit = (e) => {
    // console.log("updating the note.....")
    editNote(note.id, note.etitle, note.edescription, note.etag)
    showAlert("Note Updated Successfully", "success")

    refClose.current.click()
  };
  const onChange = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <AddNote />

      <button ref={ref} type="button" className="btn btn-dark d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-edescribedby="emailHelp"
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="desciption" className="form-label">
                    Description
                  </label>
                  <input
                    name="edescription"
                    type="text"
                    value={note.edescription}
                    className="form-control"
                    id="edescription"
                    onChange={onChange}
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
                    id="etag"
                    value={note.etag}
                    name="etag"
                    aria-edescribedby="emailHelp"
                    onChange={onChange}
                  />
                </div>


              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-outline-dark" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-dark" onClick={handleSubmit} disabled={note.etitle.length < 5 || note.edescription.length < 5}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className=" row my-3">
        <h1>Your Notes</h1>
        {/* <div className="container"> */}
        {notes.length === 0 && "No notes to display"}
        {/* </div> */}
        {notes.map((note, index) => {
          return <NoteItem key={note._id} updateNote={updateNote} note={note} />;
        })}
      </div>
    </>
  );
};
