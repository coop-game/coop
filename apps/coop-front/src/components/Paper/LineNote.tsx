import { css } from "@emotion/react";
type LineNoteType = {
  top?: string;
  left?: string;
  width?: string;
  maxWidth?: string;
  height?: string;
  maxHeight?: string;
  display?: string;
  justifyContent?: string;
  children: React.ReactNode;
};
const LineNote = ({
  top = "0%",
  left = "0px",
  width = "100%",
  maxWidth = "900px",
  height = "100%",
  maxHeight = "600px",
  display = "",
  justifyContent = "",
  children,
}: LineNoteType) => {
  return (
    <div
      css={css`
        top: ${top};
        left: ${left};
        /* position: absolute; */
        width: ${width};
        max-width: ${maxWidth};
        height: ${height};
        max-height: ${maxHeight};
        .paper {
          position: relative;
          width: 100%;
          /* max-width: 100%; */
          min-width: 200px;
          height: 100%;
          margin: 0 auto;
          background: #fafafa;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          overflow: hidden;
        }
        .paper:before {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 60px;
          background: radial-gradient(#575450 6px, transparent 7px) repeat-y;
          background-size: 30px 30px;
          border-right: 3px solid #d44147;
          box-sizing: border-box;
        }

        .paper-content {
          position: absolute;
          top: 30px;
          right: 0;
          bottom: 30px;
          left: 60px;
          background: linear-gradient(
            transparent,
            transparent 28px,
            #91d1d3 28px
          );
          background-size: 30px 30px;
          display: ${display};
          justify-content: ${justifyContent};
        }
      `}
    >
      <div className="paper">
        <div className="paper-content">{children}</div>
      </div>
    </div>
  );
};
export default LineNote;
