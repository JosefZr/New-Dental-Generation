import React, { createContext, useState, useContext } from "react";


const UserChatContext = createContext();


export const useUserToChatContext = () => useContext(UserChatContext);


export const UserChatProvider = ({ children }) => {
  const [clickedUser, setClickedUserId] = useState({ userId: null, username: null });

  return (
    <UserChatContext.Provider value={{ clickedUser, setClickedUserId }}>
      {children}
    </UserChatContext.Provider>
  );
};
