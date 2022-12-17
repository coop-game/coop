import { useEffect, useState, useRef } from "react";

function useObserver() {
  const [isDetect, setIsDetect] = useState<boolean>(false);
  const targetRef = useRef<HTMLDivElement>(null);
  const [isRatio, setIsRatio] = useState<number>();
  const callback = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setIsDetect(entry.isIntersecting);
    setIsRatio(entry.intersectionRatio);
  };
  useEffect(() => {
    const observer = new window.IntersectionObserver(callback, {
      threshold: new Array(100).fill(null).map((_, idx) => idx * 0.01),
    });
    targetRef.current && observer.observe(targetRef.current);
    return () => {
      if (observer) {
        setIsDetect(false);
        observer.disconnect();
      }
    };
  }, [targetRef]);

  return { targetRef, isDetect, isRatio };
}

export default useObserver;
