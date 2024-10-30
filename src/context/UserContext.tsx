import React, { createContext, useContext, useState, ReactNode } from "react";

type UserContextType = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [email, setEmail] = useState<string>("");

  return <UserContext.Provider value={{ email, setEmail }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("must be used within a UserProvider");
  }
  return context;
};
