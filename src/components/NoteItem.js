import React, { useContext } from "react";
import noteContext from "../context/noteContext/NoteContext";
import AlertContext from "../context/alertContext/AlertContext";

export const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;

  const alertContext = useContext(AlertContext)
  const { showAlert } = alertContext


  const { note, updateNote } = props;
  return (
    <div className="col-md-3 ">
      <div className="card my-2">
        <div className="card-body">
          <div className="d-flex align-items-center ">
            <h5 className="card-title my-1">{note.title}</h5>
            <i className="fa-solid fa-trash mx-2" onClick={() => { deleteNote(note._id); showAlert("Note deleted successfully", "success") }}> </i>
            <i className="fa-solid fa-pen-to-square mx-2" onClick={() => updateNote(note)}></i>
          </div>
          <p className="card-text">{note.description}</p>
          <p className="card-text">{note.tag}</p>
        </div>
      </div>
    </div >
  );
};
