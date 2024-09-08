import { Navigate, Outlet, useParams } from "react-router-dom";
import { Note } from "../types";

type NoteLayoutProps = {
  notes: Note[];
};

export const NoteLayout = ({ notes }: NoteLayoutProps) => {
  const { id } = useParams();
  const note = notes.find(({ id: noteId }) => noteId === id);

  if (!note) return <Navigate to="/" replace />;

  return <Outlet context={note} />;
};
