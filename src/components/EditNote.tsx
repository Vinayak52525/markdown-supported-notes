import { useNote } from "../hooks/useNote";
import { NoteData, Tag } from "../types";
import { NoteForm } from "./NoteForm";

type EditNoteProps = {
  avaiableTags: Tag[];
  onSubmit: (id: string, data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
};

export const EditNote = ({
  avaiableTags,
  onSubmit,
  onAddTag,
}: EditNoteProps) => {
  const note = useNote();
  return (
    <>
      <h1>Edit Note</h1>
      <NoteForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        avaiableTags={avaiableTags}
        onSubmit={(data) => onSubmit(note.id, data)}
        onAddTag={onAddTag}
      />
    </>
  );
};
