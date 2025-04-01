import { createContext, useState, useContext } from "react";


const UserChatContext = createContext();


export const useUserToChatContext = () => useContext(UserChatContext);


export const UserChatProvider = ({ children }) => {
  const [clickedUser, setClickedUserId] = useState({ userId: null, username: null });
  const [initialIndex,setInitialIndex] = useState(0)
  const [imagesToShow, setImagesToShow] = useState([])
  const [isMessagesLoading, setIsMessagesLoading] = useState(false)
  const [isPrivateMessagesLoading, setIsPrivateMessagesLoading] = useState(false)

  return (
    <UserChatContext.Provider value={{ 
      clickedUser, setClickedUserId,
      imagesToShow, setImagesToShow,
      initialIndex,setInitialIndex,
      isMessagesLoading, setIsMessagesLoading,
      isPrivateMessagesLoading, setIsPrivateMessagesLoading
    }}>
      {children}
    </UserChatContext.Provider>
  );
};
