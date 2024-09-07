import { Navigate, Route, Routes } from "react-router-dom";
import { NewNote } from "./components/NewNote";

const App = () => {
  return (
    <div className="m-4 text-xl">
      <Routes>
        <Route path="/" element={<h1>Root</h1>} />
        <Route path="/new" element={<NewNote />} />
        <Route path="/:id">
          <Route index element={<h1>Show</h1>} />
          <Route path="edit" element={<h1>Show Edit</h1>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};
export default App;
