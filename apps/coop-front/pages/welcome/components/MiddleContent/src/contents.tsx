import Image, { StaticImageData } from "next/image";
import { css } from "@emotion/react";
import { motion } from "framer-motion";

function MiddleContentPictureSlide({
  index,
  images,
}: {
  index: number;
  images: StaticImageData[];
}) {
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
            <Image key={idx} width="1280" src={v} alt="테스트 이미지"></Image>
          );
        })}
      </motion.div>
    </div>
  );
}

export default MiddleContentPictureSlide;
