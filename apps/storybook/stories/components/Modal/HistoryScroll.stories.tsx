/** @jsxImportSource @emotion/react */
import HistoryScroll from "@components/Scroll/HistoryScroll";
import { transitionPageAnimationState } from "@common/recoil/recoil.atom";
import { useRecoilState } from "recoil";
import { css } from "@emotion/react";
export default {
  title: "Scroll/HistoryScroll",
  component: HistoryScroll,
};

const Template = (args) => {
  return (
    <div
      css={css`
        width: 100%;
        height: 400px;
        position: relative;
      `}
    >
      <HistoryScroll
        history={
          Array.isArray(args.history)
            ? args.history
            : new Array(20).fill(null).map((_, idx) => String(idx))
        }
      />
    </div>
  );
};

export const Primary = Template.bind({});
