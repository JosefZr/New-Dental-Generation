import { useContext, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addDays, parseISO, isWithinInterval, startOfDay, endOfDay } from 'date-fns';
import { IoCalendarNumber } from 'react-icons/io5';
import { UserContext } from '@/context/UserContext';

const DynamicScheduler = ({ events }) => {
    const { setIsNewTaskOpen} = useContext(UserContext);
    const [currentTimePosition, setCurrentTimePosition] = useState(0);
    const scrollContainerRef = useRef(null); // Ref for auto-scrolling
    const currentTimeRef = useRef(null); // 

    useEffect(() => {
      const updateCurrentTimePosition = () => {
        const now = new Date();
        const minutesSinceMidnight = now.getHours() * 60 + now.getMinutes();
        setCurrentTimePosition((minutesSinceMidnight / 50) * 5); 
      };
      
      updateCurrentTimePosition();
      const interval = setInterval(updateCurrentTimePosition, 60000);
      return () => clearInterval(interval);
    }, []);

    useEffect(() => {
      // Auto-scroll to the current time when the component loads
      setTimeout(() => {
          if (scrollContainerRef.current && currentTimeRef.current) {
              scrollContainerRef.current.scrollTo({
                  top: currentTimeRef.current.offsetTop - 100, // Offset to keep some space above
                  behavior: 'smooth',
              });
          }
      }, 500); // Give time for layout to adjust
  }, []);
    
  const [selectedDate, setSelectedDate] = useState(new Date());
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const handlePrevDay = () => {
    setSelectedDate(prev => addDays(prev, -1));
  };

  const handleNextDay = () => {
    setSelectedDate(prev => addDays(prev, 1));
  };

  const getDayEvents = () => {
    return events.filter(event => {
      const eventStart = parseISO(event.start.replace(' ', 'T'));
      return isWithinInterval(eventStart, {
        start: startOfDay(selectedDate),
        end: endOfDay(selectedDate)
      });
    });
  };

  const getEventStyle = (event) => {
    const startTime = parseISO(event.start.replace(' ', 'T'));
    const endTime = parseISO(event.end.replace(' ', 'T'));
    
    const startMinutes = startTime.getHours() * 60 + startTime.getMinutes();
    const endMinutes = endTime.getHours() * 60 + endTime.getMinutes();
    const duration = endMinutes - startMinutes;
    
    return {
      top: `${(startMinutes / 50) * 5}rem`,
      height: `${(duration / 50) * 5}rem`,
    };
  };
  useEffect(() => {
    console.log("Events updated:", events);
  }, [events]);
  
  return (
    <div className="flex flex-col h-full w-full bg-my-Modal-back text-white max-md:h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex justify-between items-center p-4 ">
        <h1 className="max-lg:hidden flex text-xl font-semibold">Daily Schedule</h1>
        <div className="flex items-center justify-between gap-4">
          <button 
            className="p-2 hover:bg-slate-700 rounded-lg"
            onClick={handlePrevDay}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-lg">{format(selectedDate, 'MMMM d, yyyy')}</span>
          <button 
            className="p-2 hover:bg-slate-700 rounded-lg"
            onClick={handleNextDay}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          
        </div>
        <button 
            className="btn btn-square btn-md group rounded-md border-none bg-my-gold hover:bg-my-beige text-black" 
            onClick={() => setIsNewTaskOpen(true)}
          >
            <IoCalendarNumber className='text-lg'/>
          </button>
      </div>

      {/* Timezone Selector */}
      {/* <div className="px-4 py-2 border-b border-slate-700">
        <select className="bg-transparent text-sm text-slate-400">
          <option>Local - {format(new Date(), "OOOO")}</option>
        </select>
      </div> */}

      {/* Calendar Grid */}
      <div className="flex-1 overflow-y-scroll scrollbar-custom"  ref={scrollContainerRef}>
        <div className="grid grid-cols-[3rem_1fr] divide-x divide-[#ffffff12] border-r-[1px] border-solid border-[#ffffff12]">
          {/* Time Labels */}
          <div className="divide-y divide-transparent">
            {hours.map(hour => (
              <div key={hour} className="h-24 text-right pr-2 text-lg text-slate-400">
                {String(hour).padStart(2, '0')}
              </div>
            ))}
          </div>

          {/* Time Slots with Events */}
          <div className="divide-y divide-[#ffffff12] " style={{position:"relative"}}>
            {hours.map(hour => (
              <div 
                key={hour} 
                className="h-24 relative "
                style={{
                  backgroundImage: 'linear-gradient(to right, #ffffff12 1px, transparent 1px)',
                  backgroundSize: window.innerWidth < 640 ? '15% 100%' : '5% 100%', // Adjust for small screens
                }}
              />
            ))}
            {/* Current Time Indicator */}
            <div
              ref={currentTimeRef}
              className=" left-0 flex items-center w-full"
              style={{ top: `${currentTimePosition}rem` ,position:"absolute"}}
            >
            <span className="text-[#FF0000] text-sm font-bold  absolute left-[-50px] top-[-8px]">
              {format(new Date(), 'HH:mm')}
            </span>
            <div className="w-3 h-3 bg-[#FF0000] rounded-full absolute left-[-6px]" />
            <div className="h-[2px] bg-[#FF0000] flex-1" />
          </div>

            {/* Render Events */}
            {getDayEvents().map((event) => (
              <div
                key={event.id}
                className="absolute w-[calc(100%-0rem)] bg-[#C4A96280] p-2 overflow-hidden hover:bg-[#C4A962A0] transition-colors duration-200"
                style={{
                  ...getEventStyle(event),
                  borderLeft: '4px solid #C4A962'
                }}
              >
                <div className="text-xs text-white">
                  {format(parseISO(event.start.replace(' ', 'T')), 'HH:mm')} - 
                  {format(parseISO(event.end.replace(' ', 'T')), 'HH:mm')}
                </div>
                <div className="text-white font-bold">{event.title}</div>
                {event.description && (
                  <div className="text-xs text-white/70">{event.description}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default DynamicScheduler;