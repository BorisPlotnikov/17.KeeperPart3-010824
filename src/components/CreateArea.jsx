import React, { useState, useEffect, useRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { v4 as uuidv4 } from "uuid";
import Zoom from "@mui/material/Zoom";
import IconButton from "@mui/material/IconButton";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import PropTypes from "prop-types";

function CreateArea({ onAdd }) {
  // Form appearance based on user's behavior
  const [formInUse, setFormInUse] = useState(false);
  const toggleForm = () => setFormInUse((prevFormInUse) => !prevFormInUse);

  // Conditions to toggle the form
  useEffect(() => {
    const shouldToggleForm = (event) => {
      return (
        // Click outside of input and notes
        (event.type === "click" &&
          !event.target.closest(".input") &&
          !event.target.closest(".note")) ||
        // Click inside input when the form is closed
        (event.type === "click" &&
          event.target.closest(".input") &&
          !formInUse) ||
        // Click inside notes when the form is open
        (event.type === "click" &&
          event.target.closest(".note") &&
          formInUse) ||
        // Enter is pressed when form is closed
        (event.key === "Enter" && !formInUse)
      );
    };

    const handleToggleForm = (event) => {
      if (shouldToggleForm(event)) {
        toggleForm();
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener("click", handleToggleForm);
    window.addEventListener("keydown", handleToggleForm);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleToggleForm);
      window.removeEventListener("keydown", handleToggleForm);
    };
  }, [formInUse, toggleForm]);

  // Focus
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [formInUse]);

  // Submission
  const submitNote = (event) => {
    event.preventDefault();
    onAdd(note);
    setNote(initialNoteState);
    toggleForm();
  };

  // Alert
  const [emptyNoteAlert, setEmptyNoteAlert] = useState(false);
  const handleCloseAlert = () => {
    setEmptyNoteAlert(false);
  };

  // Validation
  function validateNote(event) {
    if (note.title.trim() === "" && note.body.trim() === "") {
      event.preventDefault();
      setEmptyNoteAlert(true);
    } else {
      submitNote(event);
    }
  }

  // Note
  const initialNoteState = { title: "", body: "" };
  const [note, setNote] = useState(initialNoteState);

  // Input
  const handleInput = ({ target: { name, value } }) => {
    setFormInUse(value.length > 0);
    setNote((prevNote) => ({ ...prevNote, [name]: value, id: uuidv4() }));
  };

  return (
    <div>
      <form
        onSubmit={validateNote}
        onKeyDown={(event) => event.key === "Enter" && validateNote(event)}
      >
        <input
          className="input"
          ref={inputRef}
          onChange={handleInput}
          value={note.title}
          name="title"
          placeholder={formInUse ? "New title..." : "Take a note..."}
          aria-label={formInUse ? "New title" : "Take a note"}
        />
        {formInUse && (
          <textarea
            className="input"
            onChange={handleInput}
            value={note.body}
            name="body"
            placeholder="New content..."
            rows="3"
            aria-label="New content"
          />
        )}
        <Zoom in={formInUse}>
          <IconButton
            className="form-button"
            size="large"
            type="submit"
            aria-label="add"
          >
            <NoteAddOutlinedIcon />
          </IconButton>
        </Zoom>
      </form>
      <div className="alert-container">
        <Snackbar
          open={emptyNoteAlert}
          autoHideDuration={1200}
          onClose={handleCloseAlert}
        >
          <Alert elevation={6} onClose={handleCloseAlert} severity="warning">
            Please add content
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

CreateArea.propTypes = {
  onAdd: PropTypes.func.isRequired
};

export default CreateArea;
