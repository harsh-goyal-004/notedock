import React, { useContext, useState } from "react";
import NotesContext from "../context/NotesContext.js";
import { motion } from "framer-motion";

const NoteSearch = () => {
  const { dispatch } = useContext(NotesContext);

  return (
    <>
      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          <motion.input
            whileFocus={{ scale: 1.01, borderColor: "#60A5FA" }}
            transition={{ duration: 0.1 }}
            type="text"
            name="search"
            id="search"
            placeholder="Search for notes..."
            className="border-2 focus:outline-none w-[95%] md:w-full py-2  px-2 m-2 rounded-lg"
            onChange={(e) =>
              dispatch({ type: "SEARCH_QUERY", payload: e.target.value })
            }
          />
        </form>
      </div>
    </>
  );
};

export default NoteSearch;
