import { Box, Text } from "@chakra-ui/react";
import stock1 from "../../../../../src/asset/stock1.jpg";
import stock2 from "../../../../../src/asset/stock2.jpg";
import stock3 from "../../../../../src/asset/stock3.jpg";
import stock4 from "../../../../../src/asset/stock4.jpg";
import Image from "next/image";
import { css } from "@emotion/react";
import { motion } from "framer-motion";

const images = [stock1, stock2, stock3, stock4];

function MiddleContentPictureSlide({ index }: { index: number }) {
  return (
    <div
      css={css`
        overflow: hidden;
        width: 99vw;
        height: 700px;
      `}
    >
      <motion.div
        animate={{
          x: `${(+index - 1) * -100 - 50}%`,
          // y:`${index === images.length ? : }`,
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
              key={idx}
              layout="responsive"
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
