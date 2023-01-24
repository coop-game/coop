import { css } from "@emotion/react";
import { useEffect, useRef } from "react";

const BackgroundNote = () => {
  const container = useRef(null);
  // useEffect(() => {
  //   const updateWindowDimensions = () => {
  //     container.current.style.width = `${window.innerWidth}`;
  //     container.current.style.height = `${window.innerHeight}`;
  //   };
  //   window.addEventListener("resize", updateWindowDimensions);
  //   return () => window.removeEventListener("resize", updateWindowDimensions);
  // }, []);
  const Css = css`
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
    /* background-color: #fff; */

    /* background-image:
    linear-gradient(90deg, transparent 79px, #a3ccd3 79px, #a3ccd3 81px, transparent 81px),
    linear-gradient(#ebe6e6 .1em, transparent .1em);*/
    /* background-size: 100% 2.2em; */

    background-color: #0c5900;
    background-image: url("https://www.transparenttextures.com/patterns/45-degree-fabric-light.png");

  `;
  return (
    <div ref={container} css={Css}>
      {/* <div className="lines"></div>
      <ul className="list">
        {new Array(100).fill("").map((_, idx) => {
          return <li key={idx}></li>;
        })}
      </ul> */}
    </div>
  );
};
export default BackgroundNote;
