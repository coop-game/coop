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
    pointer-events: none;
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .list {
      list-style: none;
      color: #555;
      font-size: 22px;
      width: 100%;
      font-family: courier, monospace;
      border: 1px solid #dedede;
    }
    .list li {
      list-style: none;
      border-bottom: 2px dotted #ccc;
      text-indent: 25px;
      height: auto;
      padding: 20px;
      text-transform: capitalize;
    }
    .list li:hover {
      background-color: #f0f0f0;
      -webkit-transition: all 0.2s;
      -moz-transition: all 0.2s;
      -ms-transition: all 0.2s;
      -o-transition: all 0.2s;
    }
    .lines {
      border-left: 2px solid #ffaa9f;
      border-right: 2px solid #ffaa9f;
      width: 4px;
      float: left;
      height: 100vh;
      height: 100%;
      overflow: auto;
      margin-left: 200px;
    }
  `;
  return (
    <div ref={container} css={Css}>
      <div className="lines"></div>
      <ul className="list">
        {new Array(100).fill("").map((_, idx) => {
          return <li key={idx}></li>;
        })}
      </ul>
    </div>
  );
};
export default BackgroundNote;
