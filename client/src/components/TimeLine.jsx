/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import  { useEffect, useRef, useState } from "react";
import TimelineObserver from "react-timeline-animation";
import "./timeline.css"

const Timeline = ({ setObserver, callback }) => {
    const [progress, setProgress] = useState(0);
    const [messages, setMessages] = useState([
      { text: "Start your journey", triggered: false },
      { text: "Halfway there", triggered: false },
      { text: "Almost at the end", triggered: false },
      { text: "You made it!", triggered: false }
    ]);
    const [confettiFired, setConfettiFired] = useState(false);
  
    const timelineRef = useRef(null);
    const wrapperRef = useRef(null);
  
    useEffect(() => {
      const handleScroll = () => {
        if (wrapperRef.current) {
          const { top, height } = wrapperRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight ;
          const scrollProgress = Math.max(0, Math.min(1, (windowHeight - top) / (height + windowHeight)));
          setProgress(scrollProgress);
  
          messages.forEach((message, index) => {
            if (!message.triggered && scrollProgress > (index + 1) / (messages.length + 1)) {
              setMessages(prev => prev.map((msg, i) => 
                i === index ? { ...msg, triggered: true } : msg
              ));
              callback();
            }
          });
  
        //   // Fire confetti only once when reaching the bottom
        //   if (scrollProgress === 1 && !confettiFired) {
        //     fireConfetti();
        //     setConfettiFired(true);
        //   }
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [messages, callback, confettiFired]);
  
    useEffect(() => {
      if (timelineRef.current) {
        setObserver(timelineRef.current);
      }
    }, [setObserver]);
  
    return (
      <div className="timeline-wrapper" ref={wrapperRef}>
        <div className="timeline-progress"  />
        <div className="timeline" ref={timelineRef} style={{ height: `${progress * 100}%` }} />
        <div className="timeline-icon" style={{ top: `${progress * 100}%` }}>
          <img src="/backs/icon.jpg" alt="Timeline Icon" />
        </div>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${index % 2 === 0 ? 'left' : 'right'} ${message.triggered ? 'visible' : ''}`}
            style={{ top: `${(index + 1) / (messages.length + 1) * 100}%` }}
          >
            {message.text}
          </div>
        ))}
      </div>
    );
  };
  
  export default function App() {
    const onCallback = () => {
      console.log("Message revealed");
    };
  
    return (
      <div className="App">
        <TimelineObserver
          initialColor="var(--gray)"
        //   fillColor="#00a86b"
          handleObserve={(setObserver) => (
            <Timeline
              callback={onCallback}
              setObserver={setObserver}
            />
          )}
        />
        <div className="bottom-spacer" />
      </div>
    );
  }