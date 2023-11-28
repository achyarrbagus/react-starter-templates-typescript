import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { useState } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState<number>(0);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
      </Routes>
    </>
  );
}

export default App;
