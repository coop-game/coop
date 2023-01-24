import { css } from "@emotion/react";
import Image from "next/image";

const PutPin = () => {
  return (
    <div
      css={css`
        width: 130px;
        height: 130px;
        border-radius: 0px 0px 0px 95px;
        overflow: hidden;
        position: relative;
      `}
    >
      <div
        css={css`
          @keyframes movePin {
            100% {
              transform: translate(0px, 30px);
            }
          }
          transform: translate(20px, 10px);
          animation: movePin 0.2s ease-out;
          animation-delay: 3s;
          animation-fill-mode: forwards;
          & > img {
            filter: drop-shadow(3px 3px 3px #4d4c4c);
          }
        `}
      >
        <Image
          src={"/images/pin.png"}
          width={100}
          height={100}
          alt={""}
        ></Image>
      </div>
    </div>
  );
};
export default PutPin;
