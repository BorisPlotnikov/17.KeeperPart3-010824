import React, { useState } from "react";
import PropTypes from "prop-types";
import Zoom from "@mui/material/Zoom";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

function Note({ id, title, body, onDelete }) {
  const [mouseOverNote, setMouseOverNote] = useState(false);
  const noteMouseOver = () => setMouseOverNote(true);
  const noteMouseOut = () => setMouseOverNote(false);

  return (
    <div onMouseOver={noteMouseOver} onMouseOut={noteMouseOut} className="note">
      <h1>{title}</h1>
      <p>{body}</p>
      <Zoom in={mouseOverNote}>
        <IconButton
          onClick={() => onDelete(id)}
          className="note-button"
          aria-label="delete"
        >
          <DeleteOutlineIcon />
        </IconButton>
      </Zoom>
    </div>
  );
}

Note.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  body: PropTypes.string,
  onDelete: PropTypes.func.isRequired
};

export default Note;
