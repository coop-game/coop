/** @jsxImportSource @emotion/react */

import { transitionPageAnimationState } from "@common/recoil/recoil.atom";
import { css } from "@emotion/react";
import Image from "next/image";
import { useRecoilValue } from "recoil";

const PutPin = () => {
  const isAnimationend = useRecoilValue(transitionPageAnimationState);
  return (
    <div
      css={css`
        transform-origin: 0, 0;
        transform: scale(0.4);
      `}
    >
      <div
        css={css`
          width: 130px;
          height: 130px;
          border-radius: 0px 0px 0px 95px;
          overflow: hidden;
          position: relative;
          @keyframes movePin {
            100% {
              transform: translate(0px, 30px);
            }
          }
          & > .pin {
            transform: translate(20px, 10px);
            & > img {
              filter: drop-shadow(3px 3px 3px #4d4c4c);
            }
          }
          & > .move {
            animation: movePin 0.2s ease-out 0.5s;
            animation-fill-mode: forwards;
          }
        `}
      >
        <div className={"pin" + (isAnimationend === true ? " move" : "")}>
          <Image
            src={"/images/pin.png"}
            width={100}
            height={100}
            alt={""}
          ></Image>
        </div>
      </div>
    </div>
  );
};
export default PutPin;
