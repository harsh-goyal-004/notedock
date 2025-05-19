import React, { useContext, useState } from "react";
import NotesContext from "../context/NotesContext.js";
import NoteItem from "./NoteItem.jsx";

const NoteList = () => {
  const { notesState } = useContext(NotesContext);
  return (
    <>
      <div className="flex flex-wrap justify-evenly">
        {notesState.notes !== null
          ? notesState.notes
              .sort((a, b) => b.pinned - a.pinned)
              .filter((note) =>
                notesState.searchQuery !== ""
                  ? note.text.includes(notesState.searchQuery)
                  : note
              )
              .map((note) => (
                <div key={note.id}>
                  <NoteItem note={note} />
                </div>
              ))
          : null}
      </div>
    </>
  );
};

export default NoteList;
