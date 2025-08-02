import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

type UserRole = "owner" | "user" | null;

interface UserContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [role, setRole] = useState<UserRole>(null);

  useEffect(() => {
    // Load role from session storage on initial render
    const savedRole = sessionStorage.getItem("userRole") as UserRole;
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  const updateRole = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole) {
      sessionStorage.setItem("userRole", newRole);
    } else {
      sessionStorage.removeItem("userRole");
    }
  };

  return (
    <UserContext.Provider value={{ role, setRole: updateRole }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
