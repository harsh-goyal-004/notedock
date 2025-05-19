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

// Add new notes
export const addNewNotes = (text) => {
  try {
    const newNote = {
      id: Date.now(),
      date: new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      text: text,
      color: tailwindColors[Math.floor(Math.random() * tailwindColors.length)],
      pinned: false,
    };

    return newNote;
  } catch (error) {
    console.log("Error while making a new note object : ", error);
  }
};
