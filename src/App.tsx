import "./App.css";
import Homepage from "./components/Homepage";
import Program from "./components/Program";
import ShopeePage from "./components/ShopeePage";
import ShopeePaidPage from "./components/ShopeePaidPage";
import CashbackAllocatePage from "./components/CashbackAllocatePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/program" element={<Program />} />
          <Route path="/shopee" element={<ShopeePage />} />
          <Route path="/shopee-paid" element={<ShopeePaidPage />} />
          <Route path="/allocate" element={<CashbackAllocatePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
