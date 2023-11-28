import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { useState } from "react";
import { Provider } from "react-redux";
import store from "./redux/redux";

function App() {
  const [searchTerm, setSearchTerm] = useState<number>(0);
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
