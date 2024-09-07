import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Note, Tag } from "../types";

type SimplifiedNote = {
  tags: Tag[];
  title: string;
  id: string;
};
type NoteListProps = {
  notes: Note[];
  avaiableTags: Tag[];
};
export const NoteList = ({ notes, avaiableTags }: NoteListProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>(avaiableTags);
  const [title, setTitle] = useState<string>("");

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [notes, selectedTags, title]);

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl">Notes</h1>
        <div className="flex gap-4">
          <Link to="/new">
            <button className="bg-blue-500 text-white px-4 py-1 rounded-md text-sm">
              Create
            </button>
          </Link>
          <button className="border-solid border-2 px-4 py-1 rounded-md text-sm">
            Edit Tags
          </button>
        </div>
      </div>
      <form className="flex mb-10 gap-4 justify-between items-center">
        <div className="flex flex-col w-1/2 gap-2">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-2 py-2  border-gray-200  border-2 rounded-sm"
          />
        </div>
        <div className="flex flex-col w-1/2 gap-2">
          <label htmlFor="tags">Tags</label>
          <ReactSelect
            value={selectedTags.map((tag) => {
              return { label: tag.label, value: tag.id };
            })}
            options={avaiableTags.map((tag) => {
              return { label: tag.label, value: tag.id };
            })}
            onChange={(tags) =>
              setSelectedTags(
                tags.map((tag) => ({ label: tag.label, id: tag.value }))
              )
            }
            isMulti
          />
        </div>
      </form>
      <div className="grid grid-cols-1 gap-4 sm md:grid-cols-2 lg:grid-cols-3">
        {filteredNotes.map((note) => (
          <div key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </div>
        ))}
      </div>
    </>
  );
};

const NoteCard = ({ id, title, tags }: SimplifiedNote) => {
  return (
    <Link to={`/${id}`}>
      <div className="card flex flex-col items-center justify-center border-solid border-2 p-4 gap-1 focus:outline-none focus:translate-y-[-5px] focus:shadow-lg">
        <h2 className="text-3xl">{title}</h2>
        <span className="flex gap-3 text-xs">
          {tags.map((tag) => (
            <p
              key={tag.id}
              className="bg-blue-500 text-white px-2 py-1 rounded-sm"
            >
              {tag.label}
            </p>
          ))}
        </span>
      </div>
    </Link>
  );
};
