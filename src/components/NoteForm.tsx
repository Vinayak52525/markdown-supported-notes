import { FormEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { NoteData, Tag } from "../types";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
};

export const NoteForm = ({ onSubmit }: NoteFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const handleSubmitNote = (event: FormEvent) => {
    event.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: [],
    });
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmitNote}>
      <div className="flex justify-between gap-5">
        <div className="flex flex-col w-full gap-1">
          <label>Title</label>
          <input
            required
            ref={titleRef}
            className="border-solid rounded-sm border-2 p-1 border-gray-200 focus:border-blue-800"
            type="text"
          />
        </div>
        <div className="flex flex-col w-full gap-1">
          <label>Tags</label>
          <CreatableReactSelect
            isMulti
            value={selectedTags.map(({ label, id }) => ({ label, value: id }))}
            onChange={(tags) =>
              setSelectedTags(
                tags.map(({ label, value }) => ({ label, id: value }))
              )
            }
          />
        </div>
      </div>

      <div className="flex flex-col w-full gap-1">
        <label>Body</label>
        <textarea required ref={markdownRef} className="border-2" rows={15} />
      </div>
      <div className="flex gap-5 justify-end">
        <button className="bg-blue-600 text-sm px-3 py-1 rounded-sm text-white">
          Save
        </button>
        <Link to="..">
          <button className="border-solid border-2 text-sm px-3 py-1 rounded-sm">
            Cancel
          </button>
        </Link>
      </div>
    </form>
  );
};
