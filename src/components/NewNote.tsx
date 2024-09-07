import { NoteData, Tag } from "../types";
import { NoteForm } from "./NoteForm";

type NetNoteProps = {
  avaiableTags: Tag[];
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
};

export const NewNote = ({ avaiableTags, onSubmit, onAddTag }: NetNoteProps) => {
  return (
    <>
      <h1 className="mb-4 text-3xl">New Note</h1>
      <NoteForm
        avaiableTags={avaiableTags}
        onSubmit={onSubmit}
        onAddTag={onAddTag}
      />
    </>
  );
};
