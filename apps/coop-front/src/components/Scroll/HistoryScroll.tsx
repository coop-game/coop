/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRef } from "react";
import ObserverBox from "./ObserverBox";
import ScrollBottomButton from "./ScrollButtonButton";

const HistoryScroll = ({ history }: { history: string[] }) => {
  const rootRef = useRef(null);
  return (
    <div
      css={css`
        position: relative;
        width: 100%;
        height: 100px;
      `}
    >
      <div
        className="history_scroll"
        ref={rootRef}
        css={css`
          overflow: hidden scroll;
          width: 100%;
          height: 100%;
          flex-flow: column nowrap;
          scroll-snap-type: y mandatory;
          border-radius: 8px;
          position: relative;
        `}
      >
        {history.map((v, idx) => {
          return <ObserverBox key={idx} rootRef={rootRef} value={v} />;
        })}
        <ObserverBox rootRef={rootRef} value={""} />
      </div>
      <div
        css={css`
          position: absolute;
          width: 250px;
          left: 50%;
          bottom: 0px;
          transform: translateX(-50%);
        `}
      >
        <ScrollBottomButton
          rootRef={rootRef}
          input={history}
        ></ScrollBottomButton>
      </div>
    </div>
  );
};
export default HistoryScroll;
