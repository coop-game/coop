import { useRef } from "react";

const useIntersectionObserver = (callback: (entry: any) => void) => {
  const observer = useRef(
    new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          console.log(entry);
          if (entry.isIntersecting) {
            callback(entry);
          }
        });
      },
      { threshold: 1 }
    )
  );

  const observe = (element: Element) => {
    observer.current.observe(element);
  };

  const unobserve = (element: Element) => {
    observer.current.unobserve(element);
  };

  const disconnect = () => {
    observer.current.disconnect();
  };

  return [observe, unobserve, disconnect];
};

export default useIntersectionObserver;
