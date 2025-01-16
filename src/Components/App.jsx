import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

  
  useEffect(() => {
    fetchNotes();
}, []);
const fetchNotes = async () => {
  try {
      const response = await axios.get('http://localhost:5000/notes'); // Use full URL
      console.log('Fetched notes:', response.data);
      setNotes(response.data);
  } catch (error) {
      console.error('Error fetching notes:', error.response ? error.response.data : error.message);
  }
};

const addNote = async (newNote) => {
  try {
      const response = await axios.post('http://localhost:5000/notes', newNote); // Use full URL
      setNotes(prevNotes => [...prevNotes, response.data]);
  } catch (error) {
      console.error('Error adding note:', error.response ? error.response.data : error.message);
  }
};

const deleteNote = async (id) => {
  await axios.delete(`/api/notes/${id}`); // Corrected URL
  setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
};

return (
  <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {Array.isArray(notes) && notes.map((noteItem) => {
          return (
              <Note
                  key={noteItem.id}
                  id={noteItem.id}
                  title={noteItem.title}
                  content={noteItem.content}
                  onDelete={deleteNote}
              />
          );
      })}
      <Footer />
  </div>
);
  
}

export default App;
