/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type ModalPortalPropsType = {
  children: React.ReactNode;
};

const ModalPortal = ({ children }: ModalPortalPropsType) => {
  const [isMound, setMount] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    setMount(true);
    ref.current = document.getElementById("root-modal");
    return () => {
      setMount(false);
    };
  }, []);
  return ref.current && isMound && createPortal(children, ref.current);
};
export default ModalPortal;
