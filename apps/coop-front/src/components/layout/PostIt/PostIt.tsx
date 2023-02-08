import PutPin from "@components/Animation/PutPin";
import { css } from "@emotion/react";

const cssPostIt = css`
  .sticky-container {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .sticky-outer {
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
  }

  .sticky {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .sticky:before {
    box-shadow: -2px 2px 15px 0 rgba(0, 0, 0, 0.5);
    background-color: rgba(0, 0, 0, 0.25);
    content: "";
    width: 90%;
    left: 5px;
    height: 70%;
    position: absolute;
    top: 30%;
  }

  .sticky-content {
    /* background: linear-gradient(
      180deg,
      hsl(198.33333333333331, 63.52941176470588%, 66.66666666666666%) 0%,
      RGB(106, 191, 224) 12%,
      RGB(96, 191, 224) 75%,
      RGB(86, 191, 224) 100%
    ); */
    /* background: linear-gradient(
      180deg,
      RGB(129, 193, 71) 0%,
      rgb(129, 193, 71) 12%,
      RGB(129, 193, 71) 75%,
      RGB(129, 193, 71) 100%
    ); */
    /* background: linear-gradient(
      180deg,
      RGB(247, 245, 224) 0%,
      RGB(247, 245, 224) 12%,
      RGB(247, 245, 224) 75%,
      RGB(247, 245, 224) 100%
    ); */
    background: linear-gradient(
      180deg,
      rgb(220, 230, 151) 0%,
      rgb(220, 230, 151) 12%,
      rgb(225, 225, 124) 75%,
      rgb(210, 210, 113) 100%
    );
    width: 100%;
    height: 100%;
    clip-path: url(#stickyClip);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  .container-inner {
    width: 100%;
    height: 100%;
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
                transform: rotate(-20deg);
                position: absolute;
                z-index: 1000;
                top: -45px;
                left: calc(50% - 60px);
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
                        strokeLinejoin="round"
                        strokeLinecap="square"
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
