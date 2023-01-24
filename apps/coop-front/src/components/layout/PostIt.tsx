import PutPin from "@components/Animation/PutPin";
import { css } from "@emotion/react";

const cssPostIt = css`
  /* Some positioning and ratios */
  .sticky-container {
    max-width: 1000px;
    position: relative;
  }

  .sticky-outer {
    display: flex;
    padding-top: 92.5925926%;
    position: relative;

    width: 100%;
  }

  .sticky {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  /* Shadow behind the sticky note */
  .sticky:before {
    box-shadow: -2px 2px 15px 0 rgba(0, 0, 0, 0.5);
    background-color: rgba(0, 0, 0, 0.25);
    content: "";
    width: 90%;
    left: 5px;
    height: 75%;
    position: absolute;
    top: 30%;
  }

  /* The sticky note itself */
  .sticky-content {
    background: linear-gradient(
      180deg,
      rgb(230, 230, 151) 0%,
      rgb(230, 230, 151) 12%,
      rgb(225, 225, 124) 75%,
      rgb(210, 210, 113) 100%
    );
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Kalam", cursive;
    font-size: 1.25rem;

    clip-path: url(#stickyClip);
  }

  /* Position the sticky nicely, so it looks better */
  html,
  body {
    height: 100%;
    margin: 0;
    font-size: 16px;
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  .container-inner {
    width: 75%;
    margin: 25px;
  }
`;

const PostIt = ({ children }) => {
  return (
    <div
      css={css`
        ${cssPostIt}
        height:100%;
        width: 100%;
      `}
    >
      <div className="container">
        <div className="container-inner">
          <div className="sticky-container">
            <div
              css={css`
                position: absolute;
                z-index: 1000;
                top: -60px;
                left: calc(50% - 40px);
              `}
            >
              <PutPin></PutPin>
            </div>
            <div className="sticky-outer">
              <div className="sticky">
                <svg width="0" height="0">
                  <defs>
                    <clipPath id="stickyClip" clipPathUnits="objectBoundingBox">
                      <path
                        d="M 0 0 Q 0 0.69, 0.03 0.96 0.03 0.96, 1 0.96 Q 0.96 0.69, 0.96 0 0.96 0, 0 0"
                        stroke-linejoin="round"
                        stroke-linecap="square"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <div className="sticky-content">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostIt;
