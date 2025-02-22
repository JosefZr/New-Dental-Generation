import { createContext, useState, useContext } from "react";


const UserChatContext = createContext();


export const useUserToChatContext = () => useContext(UserChatContext);


export const UserChatProvider = ({ children }) => {
  const [clickedUser, setClickedUserId] = useState({ userId: null, username: null });
  const [initialIndex,setInitialIndex] = useState(0)
  const [imagesToShow, setImagesToShow] = useState([])
  return (
    <UserChatContext.Provider value={{ 
      clickedUser, setClickedUserId,
      imagesToShow, setImagesToShow,
      initialIndex,setInitialIndex
    }}>
      {children}
    </UserChatContext.Provider>
  );
};
