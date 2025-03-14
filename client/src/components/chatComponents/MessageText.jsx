import DOMPurify from 'dompurify';
import { useMemo } from 'react';

export default function MessageText({ message }) {
  // Custom Markdown parser with improved regex for bold/italic
  const parseSimpleMarkdown = (text) => {
    if (!text) return '';
    
    return text
      // Bold - non-greedy matching with word boundaries consideration
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic - ensure we don't capture inside bold text that's already processed
      .replace(/\*([^*<>]*?)\*/g, '<em>$1</em>')
      // Convert newlines to line breaks for proper display
      .replace(/\n/g, '<br>');
  };

  // Memoized formatted content
  const formattedContent = useMemo(() => {
    const cleaned = DOMPurify.sanitize(
      parseSimpleMarkdown(message.content || ''),
      {
        ALLOWED_TAGS: ['b', 'strong', 'i', 'em', 'br'], // Added br for line breaks
        ALLOWED_ATTR: [],
        RETURN_DOM: false
      }
    );
    return { __html: cleaned };
  }, [message.content]);

  return (
    <div
      className="whitespace-pre-wrap max-w-none text-sm leading-5 font-inter"
      style={{
        wordBreak: 'break-word',
        overflowWrap: 'break-word'
      }}
      dangerouslySetInnerHTML={formattedContent}
    />
  );
}