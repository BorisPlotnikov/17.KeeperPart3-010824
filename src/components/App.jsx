import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  const addNote = (newNote) => {
    if (newNote.title.trim() !== "" || newNote.body.trim() !== "") {
      setNotes((prevNotes) => [...prevNotes, newNote]);
    }
  };

  const deleteNote = (id) =>
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          title={note.title}
          body={note.body}
          onDelete={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
