import { useState, useCallback, useRef } from "react";

export const useStreamResponse = () => {
  const [streamingText, setStreamingText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const timeoutRef = useRef(null);

  const startStream = useCallback((fullText, onComplete) => {
    setIsStreaming(true);
    setStreamingText('');
    let index = 0;

    const streamChunk = () => {
      if (index < fullText.length) {
        const chunkSize = Math.floor(Math.random() * 3) + 2;
        const nextText = fullText.slice(0, index + chunkSize);
        setStreamingText(nextText);
        index += chunkSize;
        timeoutRef.current = setTimeout(streamChunk, 30);
      } else {
        setStreamingText(fullText);
        setIsStreaming(false);
        if (onComplete) onComplete();
      }
    };

    streamChunk();
  }, []);

  const cancelStream = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsStreaming(false);
  }, []);

  return { streamingText, isStreaming, startStream, cancelStream };
};