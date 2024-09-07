import { useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import { NewNote } from "./components/NewNote";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { NoteData, RawNote, Tag, Note } from "./types";
import { NoteList } from "./components/NoteList";
import { NoteLayout } from "./components/NoteLayout";

const App = () => {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => ({
      ...note,
      tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
    }));
  }, [notes]);

  const onCreateNote = ({ tags: passedTags, ...data }: NoteData) => {
    console.log(data);
    setNotes((prevNotes: Note[]) => [
      ...prevNotes,
      { ...data, id: uuidV4(), tagIds: passedTags.map(({ id }) => id) },
    ]);
  };

  const addTag = (tag: Tag) => {
    setTags((prevTags: Tag[]) => [...prevTags, tag]);
  };

  return (
    <div className="m-4  text-xl">
      <Routes>
        <Route
          path="/"
          element={<NoteList notes={notesWithTags} avaiableTags={tags} />}
        />
        <Route
          path="/new"
          element={
            <NewNote
              avaiableTags={tags}
              onSubmit={onCreateNote}
              onAddTag={addTag}
            />
          }
        />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<h1>Show</h1>} />
          <Route path="edit" element={<h1>Show Edit</h1>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};
export default App;
