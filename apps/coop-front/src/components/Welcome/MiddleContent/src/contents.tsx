/** @jsxImportSource @emotion/react */

import Image from "next/image";
import { css } from "@emotion/react";
import { motion } from "framer-motion";
import stock1 from "../../../../../src/asset/stock1.jpg";
import stock2 from "../../../../../src/asset/stock2.jpg";
import stock3 from "../../../../../src/asset/stock3.jpg";
import stock4 from "../../../../../src/asset/stock4.jpg";

function MiddleContentPictureSlide({ index }: { index: number }) {
  const images = [stock1, stock2, stock3, stock4];
  return (
    <div
      css={css`
        overflow: hidden;
        width: 100%;
        height: 800px;
      `}
    >
      <motion.div
        animate={{
          x: `${(+index - 1) * -100 - 50}%`,
          scale: 1,
          rotate: 0,
        }}
        transition={{ ease: "easeOut", duration: 1 }}
        css={css`
          display: flex;
          max-height: 50em;
          max-width: 80em;
          position: relative;
          left: 50%;
        `}
      >
        {images.map((v, idx) => {
          return (
            <Image
              css={css`
                margin-right: 10px;
              `}
              key={idx}
              width="1280"
              height="720"
              src={v}
              alt="테스트 이미지"
            ></Image>
          );
        })}
      </motion.div>
    </div>
  );
}

export default MiddleContentPictureSlide;
