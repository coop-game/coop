import { css } from "@emotion/react";

const LineNote = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      css={css`
        top: 3%;
        left: 0px;
        /* position: absolute; */
        width: 100%;
        max-width: 900px;
        height: 100%;
        max-height: 600px;
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
