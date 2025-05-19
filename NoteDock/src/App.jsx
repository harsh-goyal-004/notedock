import { useEffect, useReducer, useState } from "react";
import NotesContext from "./context/NotesContext";
import NoteInput from "./components/NoteInput";
import NoteList from "./components/NoteList";
import NoteSearch from "./components/NoteSearch";
import { motion } from "framer-motion";
import {
  getNotesFromLocalStorage,
  saveNotesInLocalStorage,
} from "./utils/localStorageUtils";
import { addNewNotes } from "./utils/notesUtils";

function App() {
  // Random color for notes
  const tailwindColors = [
    "bg-red-300",
    "bg-blue-300",
    "bg-green-300",
    "bg-yellow-300",
    "bg-purple-300",
    "bg-pink-300",
    "bg-orange-300",
    "bg-teal-300",
    "bg-cyan-300",
  ];

  const initialState = {
    notes: [],
    searchQuery: "",
  };

  // Get all Notes saved in localStorage when the web app render for the first time
  const init = (initialState) => {
    const savedNotes = getNotesFromLocalStorage("notes");
    return savedNotes !== null
      ? {
          ...initialState,
          notes: savedNotes,
        }
      : {
          ...initialState,
          notes: [],
        };
  };

  const [notesState, dispatch] = useReducer(reducer, initialState, init);

  const [openModal, setOpenModal] = useState(false);

  // Save Notes in localStorage everytime the notesState changes
  useEffect(() => {
    saveNotesInLocalStorage("notes", notesState.notes);
  }, [notesState.notes]);

  function reducer(state, action) {
    switch (action.type) {
      case "ADD_NOTE":
        const newNote = addNewNotes(action.payload);
        return {
          ...state,
          notes: [...state.notes, newNote],
        };

      case "EDIT_NOTE":
        const editedNote = state.notes.map((note) =>
          note.id === action.id ? { ...note, text: action.payload } : note
        );

        return {
          ...state,
          notes: editedNote,
        };

      case "DELETE_NOTE":
        return {
          ...state,
          notes: state.notes.filter((note) => note.id !== action.payload),
        };

      case "PIN_NOTE":
        return {
          ...state,
          notes: state.notes.map((note) =>
            note.id === action.payload
              ? { ...note, pinned: !note.pinned }
              : note
          ),
        };

      case "SEARCH_QUERY":
        return {
          ...state,
          searchQuery: action.payload,
        };

      default:
        return state;
    }
  }

  return (
    <>
      <NotesContext.Provider
        value={{ notesState, dispatch, setOpenModal, openModal }}
      >
        <div className="w-full min-h-screen flex flex-col md:flex-row gap-2">
          <div className="border-r-2 flex md:block justify-between md:min-h-screen w-full md:w-[10vw] text-center">
            <motion.h1
              whileHover={{
                scale: 1.05,
              }}
              transition={{ duration: 0.3 }}
              className="pl-2 pt-4 md:pl-0 tracking-wider font-bold hover:cursor-pointer "
            >
              NOTE DOCK
            </motion.h1>
            <motion.button onClick={() => setOpenModal(!openModal)}>
              <motion.img
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.8 }}
                transition={{ duration: 0.1 }}
                src="/add.svg"
                alt="Add Note"
                className="w-14 mt-2 md:mt-10"
              />
            </motion.button>
          </div>
          <div className="w-full md:w-[85vw] pt-2 flex flex-col ">
            <NoteSearch />
            <NoteList />
            <NoteInput />
          </div>
        </div>
      </NotesContext.Provider>
    </>
  );
}

export default App;
