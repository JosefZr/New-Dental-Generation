// components/chatComponents/MessageText.jsx
import { UserContext } from '@/context/UserContext';
import { useGetAllCourses } from '@/hooks/courses/useGetAllCourses';
import DOMPurify from 'dompurify';
import { useContext, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MessageText({ message }) {
  const navigate = useNavigate();

  const { data: studentCourseList } = useGetAllCourses();
  const {channels} = useContext(UserContext)

  // Extract course, module, and lecture IDs from URL
  const courseUrlData = useMemo(() => {
    const courseRegex = /(http|https):\/\/[^\s]+course\/details\/([a-f0-9]{24})\/([a-f0-9]{24})\/([a-f0-9]{24})/;
    const match = message.content.match(courseRegex);
    return match ? {
      courseId: match[2],
      moduleId: match[3],
      lectureId: match[4],
      fullUrl: match[0]
    } : null;
  }, [message.content]);

  // Find course and lecture details
  const { course, lectureTitle } = useMemo(() => {
    if (!studentCourseList || !courseUrlData) return { course: null, lectureTitle: null };
    
    const course = studentCourseList.find(c => c._id === courseUrlData.courseId);
    if (!course) return { course: null, lectureTitle: null };

    // Search for lecture title
    let foundLectureTitle = '';
    course.modules?.forEach(module => {
      if (module._id === courseUrlData.moduleId) {
        module.subModules?.forEach(subModule => {
          subModule.lectures?.forEach(lecture => {
            if (lecture._id === courseUrlData.lectureId) {
              foundLectureTitle = lecture.title;
            }
          });
        });
      }
    });

    return { course, lectureTitle: foundLectureTitle };
  }, [studentCourseList, courseUrlData]);

// Add click handler for channel mentions
useEffect(() => {
  const handleChannelClick = (e) => {
    if (e.target.classList.contains('channel-mention')) {
      e.preventDefault();
      const channelId = e.target.dataset.channelid;
      navigate(`/channels/${channelId}`);
    }
  };

  document.addEventListener('click', handleChannelClick);
  return () => document.removeEventListener('click', handleChannelClick);
}, [navigate]);
  
const parseChannelMentions = (text) => {
  if (!text || !channels) return text;

  return text.replace(/#([a-zA-Z0-9-_]+)/g, (match, channelName) => {
    const cleanChannelName = channelName.replace(/[^\w-]/g, '').trim().toLowerCase();
    const channel = channels.find(c =>
      c.title.toLowerCase().trim().replace(/[^\w-]/g, '') === cleanChannelName
    );

    return channel 
      ? `<a href="/channels/${channel._id}" class="channel-mention" data-channelid="${channel._id}" style="color: #4299e1; cursor: pointer; text-decoration: underline;">#${channelName.trim()}</a>`
      : match;
  });
};

  // 2. Enhanced markdown parser with debugging
  const parseSimpleMarkdown = (text) => {
    if (!text) return '';
    
    // Step 1: Process channel mentions
    let processedText = parseChannelMentions(text);
    
    // Step 2: Remove course URLs
    processedText = processedText.replace(
      /(http|https):\/\/[^\s]+course\/details\/([a-f0-9]{24})\/([a-f0-9]{24})\/([a-f0-9]{24})/g, 
      ''
    );
    
    // Step 3: Process markdown formatting
    return processedText
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*<>]*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  };

  // 3. Memoized content with safe HTML
  const formattedContent = useMemo(() => {
    const rawHTML = parseSimpleMarkdown(message.content || '');
    
    // Add debug logging
    console.log('Original content:', message.content);
    console.log('Processed HTML:', rawHTML);
    
    return {
      __html: DOMPurify.sanitize(rawHTML, {
        ALLOWED_TAGS: ['b', 'strong', 'i', 'em', 'br', 'a'],
        ALLOWED_ATTR: ['href', 'class', 'style', 'data-channelid']
      })
    };
  }, [message.content, channels]);

  // 4. Robust click handler with error boundaries
  useEffect(() => {
    const handleChannelClick = (e) => {
      // Use closest() to handle nested elements
      const target = e.target.closest('.channel-mention');
      if (!target) return;
      
      e.preventDefault();
      const channelId = target.dataset.channelid;
      
      if (!channelId) {
        console.error('Channel ID missing in:', target);
        return;
      }
      
      console.log('Navigating to channel:', channelId);
      navigate(`/channels/${channelId}`);
    };
  
    document.addEventListener('click', handleChannelClick);
    return () => document.removeEventListener('click', handleChannelClick);
  }, [navigate]);


  return (
    <div className="space-y-2">
      {message.content.replace(courseUrlData?.fullUrl || '', '').trim() && (
        <div
          className="whitespace-pre-wrap max-w-none text-sm leading-5 font-inter"
          dangerouslySetInnerHTML={formattedContent}
        />
      )}
      
      {courseUrlData && (
      <div className="rounded-lg mt-[2px] w-full max-w-[90vw]" style={{
        backgroundColor: "hsl(210 27.586% 22.745%)"
      }}>
        <div className='flex flex-col gap-2 p-3 md:flex-row md:items-center md:justify-between'>
          <div className="flex flex-1 gap-3">
            {/* Image container */}
            <div className="relative flex cursor-pointer items-center justify-center rounded-full bg-base-100 font-bold text-lg flex-none" 
                style={{ 
                  height: "56px", 
                  width: "56px",
                  minWidth: "56px" // Prevent image shrinkage
                }}>
              <img 
                src={`${import.meta.env.VITE_SERVER_API}/uploads/course/${course?.image}`}
                alt="Course thumbnail"
                className="transform cursor-pointer rounded-full drop-shadow-xl transition-all object-cover w-full h-full"
              />
            </div>

            {/* Text container */}
            <div className='flex-1 min-w-0'> {/* Add min-w-0 for text truncation */}
              <h4 className="line-clamp-2 break-words font-bold text-sm">
                {course?.title || "Course Preview"}
              </h4>
              <p className="line-clamp-1 break-words text-neutral-content text-xs mt-1">
                {lectureTitle || "Lecture Preview"}
              </p>
            </div>
          </div>
          
          {/* OPEN button container */}
          <div className="flex justify-end md:justify-start mt-2 md:mt-0">
            <a
              href={courseUrlData.fullUrl}
              className="btn btn-sm bg-my-dark-blue hover:bg-slate-900 whitespace-nowrap max-sm:w-full"
              style={{ 
                minWidth: "80px", 
                padding: "0.25rem 0.75rem" 
              }}
            >
              OPEN
            </a>
          </div>
        </div>
      </div>
    )}
    </div>
  );
}