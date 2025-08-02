import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ownerIcon from "../assets/login/owner.png";
import userIcon from "../assets/login/user.png";
import { useUser } from "../context/UserContext"; // Import the context
import "./OrgRegisterPage.css"; // Assuming you have a CSS file for styling
import "./RoleSelectionPage.css";

const RoleSelectionPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setRole } = useUser(); // Get the setRole function from context

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
  };

  const handleConfirm = () => {
    if (selectedRole) {
      // Update role in context (which also updates sessionStorage)
      setRole(selectedRole as "owner" | "user");
      // Navigate to login page
      if (selectedRole === "owner") {
        navigate("/org-login");
      }
      else {
        // For user role, navigate to login page
        navigate("/login");
      }
    }
  };

  return (
    <div className="role-selection-page">
      <div className="role-selection-container">
        <h1>Select Your Role</h1>
        <div className="role-options">
          <div
            className={`role-option ${
              selectedRole === "owner" ? "selected" : ""
            }`}
            onClick={() => handleRoleSelect("owner")}
          >
            <img src={ownerIcon} alt="Owner" />
            <h2>Social Program Director</h2>
          </div>
          <div
            className={`role-option ${
              selectedRole === "user" ? "selected" : ""
            }`}
            onClick={() => handleRoleSelect("user")}
          >
            <img src={userIcon} alt="User" />
            <h2>User</h2>
          </div>
        </div>
        <button
          className="confirm-button"
          disabled={!selectedRole}
          onClick={handleConfirm}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default RoleSelectionPage;
