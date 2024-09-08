import { Link, useNavigate } from "react-router-dom";
import { useNote } from "../hooks/useNote";
import ReactMarkdown from "react-markdown";

type NoteProps = {
  onDeleteNote: (id: string) => void;
};

export const Note = ({ onDeleteNote }: NoteProps) => {
  const note = useNote();
  const navigate = useNavigate();
  return (
    <div className="h-full flex flex-col break-words">
      <div className="flex items-center flex-col justify-between mb-4 gap-4">
        <div className="flex flex-col gap-2 justify-center items-center">
          <h1 className="text-2xl lg:text-4xl md:3xl font-bold">
            {note.title}
          </h1>
          <span className="text-xs flex gap-2 items-center">
            <p className="font-semibold">Tags: </p>
            {note.tags.map((tag) => (
              <p
                key={tag.id}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                {tag.label}
              </p>
            ))}
          </span>
        </div>
        <div className="flex gap-2 text-sm items-center">
          <Link to={`/${note.id}/edit`}>
            <button className="bg-blue-500 text-white px-3 py-1 rounded">
              Edit
            </button>
          </Link>
          <button
            className="border-solid border-red-200 text-red-300 border-2 px-3 py-1 rounded"
            onClick={() => {
              onDeleteNote(note.id);
              navigate("/");
            }}
          >
            Delete
          </button>
          <Link to="/">
            <button className="border-solid border-gray-200 text-gray-300 border-2 px-3 py-1 rounded">
              Back
            </button>
          </Link>
        </div>
      </div>
      <ReactMarkdown className="scrollbar-thin h-full overflow-y-scroll">
        {note.markdown}
      </ReactMarkdown>
    </div>
  );
};
