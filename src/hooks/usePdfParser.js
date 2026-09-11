import { useState } from 'react';

export const usePdfParser = () => {
  const [isParsing, setIsParsing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const parseFile = (file) => {
    setIsParsing(true);
    setProgress(0);
    setError(null);

    return new Promise((resolve, reject) => {
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 20;
        setProgress(currentProgress);

        if (currentProgress >= 100) {
          clearInterval(interval);
          setIsParsing(false);
          if (file.name.endsWith('.pdf') || file.name.endsWith('.txt')) {
            resolve({
              id: `file-${Date.now()}`,
              name: file.name,
              size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
              uploadedAt: 'Just now',
              status: 'parsed',
              content: `Extracted content from ${file.name}: Core focus covers memory layout, thread synchronization, and Big-O trade-offs.`
            });
          } else {
            const errMessage = 'Unsupported file format. Please upload only PDF or TXT files.';
            setError(errMessage);
            reject(new Error(errMessage));
          }
        }
      }, 300);
    });
  };

  return { parseFile, isParsing, progress, error };
};