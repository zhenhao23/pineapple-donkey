import "./App.css";
import Homepage from "./components/Homepage";
import Program from "./components/Program";
import ShopeePage from "./components/ShopeePage";
import ShopeePaidPage from "./components/ShopeePaidPage";
import CashbackAllocatePage from "./components/CashbackAllocatePage";
import LoginPage from "./components/LoginPage";
import UserProfile from "./components/UserProfile";
import TurtleTimelinePage from "./components/TurtleTimelinePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Program" element={<Program />} />
          <Route path="/shopee" element={<ShopeePage />} />
          <Route path="/shopee-paid" element={<ShopeePaidPage />} />
          <Route path="/allocate" element={<CashbackAllocatePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/turtle-timeline" element={<TurtleTimelinePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
