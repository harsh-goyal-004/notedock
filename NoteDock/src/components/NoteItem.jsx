import { useContext, useState } from "react";
import NotesContext from "../context/NotesContext";
import { AnimatePresence, motion } from "framer-motion";

const NoteItem = ({ note }) => {
  const { dispatch } = useContext(NotesContext);
  const [editText, setEditText] = useState(false);
  const [editedText, setEditedText] = useState(note.text);

  return (
    <>
      <AnimatePresence>
        <div className="group">
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            layout
            className={` ${note.color} w-56 m-5 rounded-lg h-64  px-4 py-4 relative
          `}
          >
            <button
              onClick={() => dispatch({ type: "PIN_NOTE", payload: note.id })}
              className={`${
                note.pinned ? "visible" : "group-hover:visible invisible"
              }`}
            >
              <img
                src="/pin.svg"
                alt="Pin Note"
                className="w-6 absolute rounded-full p-1 bg-black border-none right-2 top-2"
              />
            </button>
            <textarea
              readOnly={!editText}
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className={`${
                editText ? " border-2 border-black " : ""
              }font-medium rounded-lg resize-none p-1 tracking-wide bg-transparent w-full h-[84%] outline-none`}
            />
            <span className=" absolute rounded-full pb-1 text-[13px] left-4 font-medium bottom-2">
              {note.date.toString()}
            </span>
            <button
              onClick={() => {
                setEditText(!editText);
                dispatch({
                  type: "EDIT_NOTE",
                  payload: editedText,
                  id: note.id,
                });
              }}
            >
              <img
                src="/edit.svg"
                alt="Edit Note"
                className="w-8 absolute rounded-full p-1 bg-black border-none right-14 bottom-2"
              />
            </button>
            <button
              onClick={() =>
                dispatch({ type: "DELETE_NOTE", payload: note.id })
              }
            >
              <img
                src="/delete.svg"
                alt="Delete Note"
                className="w-8 absolute rounded-full p-1 bg-black border-none right-3 bottom-2"
              />
            </button>
          </motion.div>
        </div>
      </AnimatePresence>
    </>
  );
};

export default NoteItem;
