import { useEffect, useState, useRef } from "react";

function useObserver() {
  const [isDetect, setIsDetect] = useState<boolean>(false);
  const targetRef = useRef<HTMLDivElement>(null);
  const callback = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setIsDetect(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new window.IntersectionObserver(callback, {
      threshold: 0,
    });

    targetRef.current && observer.observe(targetRef.current);

    return () => {
      if (observer) {
        setIsDetect(false);
        observer.disconnect();
      }
    };
  }, [targetRef]);

  return { targetRef, isDetect };
}

export default useObserver;
