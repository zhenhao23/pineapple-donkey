import "./App.css";
import Homepage from "./components/Homepage";
import Program from "./components/Program";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/program" element={<Program />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
