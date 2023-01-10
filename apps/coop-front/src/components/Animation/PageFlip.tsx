import { Transition } from "react-transition-group";
import { useRef, useState } from "react";
import LineNote from "@components/Paper/LineNote";
import { css } from "@emotion/react";

const duration = 300;

const defaultStyle = css`
  transition: opacity ${duration}ms ease-in-out;
  /* transform: translate(50px, 50px);
  transition-duration: ${500}ms;
  opacity: 0; */
`;

const transitionStyles = {
  entering: css`
    opacity: 1;
  `,
  entered: css`
    opacity: 1;
  `,
  exiting: css`
    opacity: 0;
  `,
  exited: css`
    opacity: 0;
  `,
};

function Fade({ in: inProp }) {
  const nodeRef = useRef(null);
  return (
    <Transition nodeRef={nodeRef} in={inProp} timeout={duration}>
      {(state: string) => (
        <div
          ref={nodeRef}
          css={css`
            ${defaultStyle}
            ${transitionStyles[state]}
          `}
          style={{
            ...transitionStyles[state],
          }}
        >
          <LineNote>{"page 2 임"}</LineNote>
          <LineNote>{"page 1 임"}</LineNote>
        </div>
      )}
    </Transition>
  );
}
const PageFlip = () => {
  const [inProp, setInProp] = useState(false);
  return (
    <div>
      <Fade in={inProp}></Fade>
      <button onClick={() => setInProp((prev) => !prev)}>Click to Enter</button>
      {/* <div className="p1"></div>
      <div className="p1"></div> */}
    </div>
  );
};
export default PageFlip;
