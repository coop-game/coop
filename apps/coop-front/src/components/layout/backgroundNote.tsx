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
  `;
  return <div css={Css} />;
};
export default BackgroundNote;
