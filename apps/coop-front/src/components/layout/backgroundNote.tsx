import { css } from "@emotion/react";
import { useEffect, useRef } from "react";

const BackgroundNote = () => {
  const Css = css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #0c5900;
    background-image: url("/images/45-degree-fabric-light.png");
    /* background: url("/images/45-degree-fabric-light.png"),
      linear-gradient(70deg, #721480, #5cbab4); */

    /* @keyframes gredient {
      0% {
        background: url("/images/45-degree-fabric-light.png"),
          linear-gradient(70deg, #721480, #424cb2);
      }
      25% {
        background: url("/images/45-degree-fabric-light.png"),
          linear-gradient(140deg, #424cb2, #0092d9);
      }
      50% {
        background: url("/images/45-degree-fabric-light.png"),
          linear-gradient(210deg, #0092d9, #00c7be);
      }
      75% {
        background: url("/images/45-degree-fabric-light.png"),
          linear-gradient(70deg, #721480, #6c6a6a);
      }
      100% {
        background: url("/images/45-degree-fabric-light.png"),
          linear-gradient(70deg, #721480, #6c6a6a);
      }
    }
    animation: gredient 20s linear infinite; */
  `;
  return <div className={"background_node"} css={Css} />;
};
export default BackgroundNote;
