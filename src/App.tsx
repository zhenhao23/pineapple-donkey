import "./App.css";
import Homepage from "./components/Homepage";
import Program from "./components/Program";
import ShopeePage from "./components/ShopeePage";
import ShopeePaidPage from "./components/ShopeePaidPage";
import CashbackAllocatePage from "./components/CashbackAllocatePage";
import RoleSelectionPage from "./components/RoleSelectionPage";
import LoginPage from "./components/LoginPage";
import OrgLoginPage from "./components/OrgLoginPage";
import OrgRegisterPage from "./components/OrgRegisterPage";
import OrgWaitingPage from "./components/OrgWaitingPage";
import UserProfile from "./components/UserProfile";
import TurtleTimelinePage from "./components/TurtleTimelinePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<RoleSelectionPage />} />
            <Route path="/home" element={<Homepage />} />
            <Route path="/Program" element={<Program />} />
            <Route path="/shopee" element={<ShopeePage />} />
            <Route path="/shopee-paid" element={<ShopeePaidPage />} />
            <Route path="/allocate" element={<CashbackAllocatePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/org-login" element={<OrgLoginPage />} />
            <Route path="/org-register" element={<OrgRegisterPage />} />
            <Route path="/org-waiting" element={<OrgWaitingPage />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/turtle-timeline" element={<TurtleTimelinePage />} />
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
