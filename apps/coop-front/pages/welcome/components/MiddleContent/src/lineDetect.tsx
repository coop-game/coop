import { css } from "@emotion/react";
import { nextContentType } from "@pages/welcome";
import useObserver from "hooks/useObserver";
import { useEffect } from "react";
function MiddleContentLineDetect({
  setRatio,
}: {
  setRatio: ({ ratio, detect }: nextContentType) => void;
}) {
  const { isRatio, isDetect, targetRef } = useObserver();
  useEffect(() => {
    if (isRatio !== undefined && isDetect) {
      setRatio({ ratio: isRatio, detect: isDetect });
    } else {
      setRatio({ ratio: undefined, detect: false });
    }
  }, [isDetect, isRatio]);

  return (
    <div
      css={css`
        background: gray;
        position: relative;
        z-index: 1000;
      `}
    >
      <div
        ref={targetRef}
        css={css`
          height: 50vh;
        `}
      >
        {new Array(1000).fill(null).map((_, idx) => (
          <div key={idx}>asdffadsfadssadf</div>
        ))}
      </div>
    </div>
  );
}

export default MiddleContentLineDetect;
