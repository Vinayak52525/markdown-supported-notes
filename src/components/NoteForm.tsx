import { FormEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { v4 as uuidV4 } from "uuid";
import { NoteData, Tag } from "../types";

type NoteFormProps = {
  avaiableTags: Tag[];
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
} & Partial<NoteData>;

export const NoteForm = ({
  avaiableTags,
  onSubmit,
  onAddTag,
  title = "",
  markdown = "",
  tags = [],
}: NoteFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const handleSubmitNote = (event: FormEvent) => {
    event.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });
    navigate("..");
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmitNote}>
      <div className="flex flex-col md:flex-row lg:flex-row justify-between gap-5">
        <div className="flex flex-col w-full gap-1">
          <label>Title</label>
          <input
            required
            defaultValue={title}
            ref={titleRef}
            className="border-solid rounded-sm border-2 p-1 border-gray-200 focus:border-blue-800"
            type="text"
          />
        </div>
        <div className="flex flex-col w-full gap-1">
          <label>Tags</label>
          <CreatableReactSelect
            isMulti
            options={avaiableTags.map(({ label, id }) => ({
              label,
              value: id,
            }))}
            onCreateOption={(label) => {
              const newTag = { id: uuidV4(), label };
              onAddTag(newTag);
              setSelectedTags((prev) => [...prev, newTag]);
            }}
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
        <textarea
          required
          ref={markdownRef}
          defaultValue={markdown}
          className="border-2 p-3"
          rows={15}
        />
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
