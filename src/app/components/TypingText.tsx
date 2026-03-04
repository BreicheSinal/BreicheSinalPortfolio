import { useState, useEffect } from "react";

interface TypingTextProps {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
}

export function TypingText({
  text,
  speed = 50,
  startDelay = 0,
  className = "",
}: TypingTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(startDelay === 0);

  useEffect(() => {
    setDisplayText("");
    setCurrentIndex(0);
    setHasStarted(startDelay === 0);
  }, [text, startDelay]);

  useEffect(() => {
    if (!hasStarted) {
      const delayTimer = setTimeout(() => {
        setHasStarted(true);
      }, startDelay);

      return () => clearTimeout(delayTimer);
    }

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, startDelay, hasStarted]);

  return (
    <span className={className}>
      {displayText}
      {hasStarted && currentIndex < text.length && (
        <span className="inline-block w-[2px] h-[1em] bg-cyan-400 ml-1 animate-pulse" />
      )}
    </span>
  );
}
