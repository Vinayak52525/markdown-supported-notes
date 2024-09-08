import { useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import { NewNote } from "./components/NewNote";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { NoteData, RawNote, Tag, Note } from "./types";
import { NoteList } from "./components/NoteList";
import { NoteLayout } from "./components/NoteLayout";
import { Note as NoteComponent } from "./components/Note";
import { EditNote } from "./components/EditNote";

const App = () => {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => ({
      ...note,
      tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
    }));
  }, [notes, tags]);

  const onCreateNote = ({ tags: passedTags, ...data }: NoteData) => {
    setNotes((prevNotes: Note[]) => [
      ...prevNotes,
      { ...data, id: uuidV4(), tagIds: passedTags.map(({ id }) => id) },
    ]);
  };

  const onUpdateNote = (
    id: string,
    { tags: passedTags, ...data }: NoteData
  ) => {
    setNotes((prevNotes: Note[]) =>
      prevNotes.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            ...data,
            tagIds: passedTags.map((tag) => tag.id),
          };
        }
        return note;
      })
    );
  };

  const onDeleteNote = (id: string) => {
    setNotes((prevNotes: Note[]) => prevNotes.filter((note) => note.id !== id));
  };

  const addTag = (tag: Tag) => {
    setTags((prevTags: Tag[]) => [...prevTags, tag]);
  };

  const deleteTag = (id: string) => {
    setTags((prevTags: Tag[]) => prevTags.filter((tag) => tag.id !== id));
  };

  return (
    <div className="px-5 pt-6 lg:px-36 lg:pt-14 md:px-40 md:pt-10 bg-slate-100 h-screen overflow-hidden">
      <Routes>
        <Route
          path="/"
          element={
            <NoteList
              notes={notesWithTags}
              avaiableTags={tags}
              onDeleteTag={deleteTag}
            />
          }
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
          <Route
            index
            element={<NoteComponent onDeleteNote={onDeleteNote} />}
          />
          <Route
            path="edit"
            element={
              <EditNote
                avaiableTags={tags}
                onSubmit={onUpdateNote}
                onAddTag={addTag}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};
export default App;
