import { NoteData } from "../types";
import { NoteForm } from "./NoteForm";

type NetNoteProps = {
  onSubmit: (data: NoteData) => void;
};

export const NewNote = ({ onSubmit }: NetNoteProps) => {
  return (
    <>
      <h1 className="mb-4 text-3xl">New Note</h1>
      <NoteForm onSubmit={() => {}} />
    </>
  );
};
