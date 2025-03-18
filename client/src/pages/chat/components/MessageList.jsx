// MessageList.jsx
import { memo, useRef } from 'react';
import Message from '@/components/chatComponents/Message';
import Devider from '@/components/chatComponents/Devider';

export const MessageList = memo(({ messages, chanId, onEditMessage,containerRef }) => {
  const lastMessageRef = useRef();

  return (
    <div
      className=" translate-y-0 opacity-100 "
      style={{ top: "48px", left: "0", width: "100%", bottom: "66px", position:"absolute"}}
    >
      <div
        ref={containerRef}
        className="z-10 overflow-y-auto overflow-x-hidden transition-transform duration-keyboard will-change-transform custom-scroll"
        style={{ height: "100%" }}
      >
        <div className="viewport relative will-change-transform translate-y-0 ">
          <div className="w-full">      
          {messages && messages.map((message, index) => (
            <div key={`${message._id}-${index}`}>
            <Message 
                message={message}
                chanId={chanId}
                onEdit={onEditMessage}
            />
          <Devider />
          {index === messages.length - 1 && (
            <div ref={lastMessageRef} />
          )}
        </div>
      ))}
    </div>
    </div>
    </div>
    </div>
  );
});