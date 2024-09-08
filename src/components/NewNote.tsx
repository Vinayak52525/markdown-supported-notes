import { NoteData, Tag } from "../types";
import { NoteForm } from "./NoteForm";

type NewNoteProps = {
  avaiableTags: Tag[];
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
};

export const NewNote = ({ avaiableTags, onSubmit, onAddTag }: NewNoteProps) => {
  return (
    <>
      <h1 className="mb-4 text-2xl lg:text-4xl md:3xl">New Note</h1>
      <NoteForm
        avaiableTags={avaiableTags}
        onSubmit={onSubmit}
        onAddTag={onAddTag}
      />
    </>
  );
};
