// Save notes in localStorage
const saveNotesInLocalStorage = (key, notes) => {
  try {
    localStorage.setItem(key, JSON.stringify(notes));
  } catch (error) {
    console.log("Failed to save notes in localStorage : ", error);
  }
};

// Get Notes from localStorage
const getNotesFromLocalStorage = (key) => {
  try {
    const savedNotes = localStorage.getItem(key);
    return savedNotes !== null ? JSON.parse(savedNotes) : [];
  } catch (error) {
    console.log("Failed to fetch notes from localStorage :", error);
    return null;
  }
};

export { saveNotesInLocalStorage, getNotesFromLocalStorage };
