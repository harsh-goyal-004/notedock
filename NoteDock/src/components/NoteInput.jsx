import React, { useContext, useState } from "react";
import NotesContext from "../context/NotesContext.js";
import { AnimatePresence, motion } from "framer-motion";

const NoteInput = () => {
  const { notesState, dispatch, setOpenModal, openModal } =
    useContext(NotesContext);

  const [note, setNote] = useState("");

  function handleAddNote() {
    if (note !== "") {
      dispatch({ type: "ADD_NOTE", payload: note });
      setOpenModal(false);
      setNote("");
    }
  }

  return (
    <AnimatePresence>
      {openModal && (
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 200, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeIn" }}
          className={`h-screen w-full backdrop-blur-[1px] justify-center  fixed md:items-center z-10 flex`}
        >
          <div className="border mt-[70%] mb-[50%] md:mt-0 md:mb-0 w-[80vw] md:w-[50vw] bg-white h-[30vh] md:h-[60vh] rounded-xl flex flex-col relative shadow-2xl">
            <form onSubmit={(e) => e.preventDefault()}>
              <h1 className="font-medium text-lg self-start pl-5 pb-2 pt-2 tracking-wide">
                Add notes
              </h1>
              <motion.textarea
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.1 }}
                name="note"
                id="note"
                className="justify-self-center w-[90%] absolute right-[50%] left-[50%] h-[65%] rounded-lg p-3 bg-gray-100 border-2 border-gray-300"
                placeholder="Type your thoughts..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              ></motion.textarea>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.8 }}
                transition={{ duration: 0.1 }}
                className="absolute bottom-2 right-32 border-black text-black bg-white border-2 text-sm px-4 py-2 mb-1 rounded-lg font-medium tracking-wide"
                onClick={() => setOpenModal(false)}
              >
                Close
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.8 }}
                transition={{ duration: 0.1 }}
                type="submit"
                className="absolute bottom-2 right-2 border-2 bg-blue-600 text-white px-4 py-2 mb-1 text-sm rounded-lg font-medium"
                onClick={() => handleAddNote()}
              >
                Save note
              </motion.button>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NoteInput;
