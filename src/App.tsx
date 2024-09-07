import { useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import { NewNote } from "./components/NewNote";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { NoteData, RawNoteData, Tag } from "./types";

const App = () => {
  const [notes, setNotes] = useLocalStorage<RawNoteData[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => ({
      ...note,
      tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
    }));
  }, [notes]);

  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes((prevNotes: NoteData[]) => [
      ...prevNotes,
      { ...data, id: uuidV4(), tagIds: tags.map(({ id }) => id) },
    ]);
  };

  return (
    <div className="m-4 text-xl">
      <Routes>
        <Route path="/" element={<h1>Root</h1>} />
        <Route path="/new" element={<NewNote onSubmit={onCreateNote} />} />
        <Route path="/:id">
          <Route index element={<h1>Show</h1>} />
          <Route path="edit" element={<h1>Show Edit</h1>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};
export default App;
