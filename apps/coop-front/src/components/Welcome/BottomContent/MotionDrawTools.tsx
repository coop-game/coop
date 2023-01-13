import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { motion } from "framer-motion";
import { css } from "@emotion/react";
import { useFollowPointer } from "@hooks/useFollowPointer";
import { useRef } from "react";

export default function MotionDrawTools() {
  const ref = useRef(null);
  const { x, y } = useFollowPointer(ref);
  return (
    <Box ref={ref} position={"absolute"} zIndex={1}>
      <motion.div
        initial={{
          x: "0%",
          y: "0%",
        }}
        whileInView={{
          x: `calc(-600% + ${x}px)`,
          y: `calc(-500% + ${y}px)`,
          rotate: 360,
          transition: {
            bounce: 0,
            duration: 1,
            ease: "easeOut",
          },
        }}
        viewport={{ once: true, amount: 0.9 }}
        css={css`
          position: absolute;
          width: 50px;
          height: 50px;
        `}
      >
        <Image
          src="/images/writingToolsIcon/pencil_colorful.png"
          width={50}
          height={50}
          alt="연필"
        ></Image>
      </motion.div>
      <motion.div
        initial={{
          x: "0%",
          y: "0%",
        }}
        whileInView={{
          x: `calc(445% + ${x}px)`,
          y: `calc(150% + ${y}px)`,
          rotate: 180,
          transition: {
            bounce: 0,
            duration: 1,
            ease: "easeOut",
          },
        }}
        viewport={{ once: true, amount: 0.9 }}
        css={css`
          position: absolute;
          width: 100px;
          height: 100px;
        `}
      >
        <Image
          src="/images/writingToolsIcon/spiral_book_and_pencil.png"
          width={100}
          height={100}
          alt="공책과 연필"
        ></Image>
      </motion.div>
      <motion.div
        initial={{
          x: "0%",
          y: "0%",
        }}
        whileInView={{
          x: `calc(250% + ${x}px)`,
          y: `calc(-300% + ${y}px)`,
          rotate: 90,
          transition: {
            bounce: 0,
            duration: 1,
            ease: "easeOut",
          },
        }}
        viewport={{ once: true, amount: 0.9 }}
        css={css`
          position: absolute;
          width: 50px;
          height: 50px;
        `}
      >
        <Image
          src="/images/writingToolsIcon/eraser_white.png"
          width={50}
          height={50}
          alt="연필"
        ></Image>
      </motion.div>
      <motion.div
        initial={{
          x: "0%",
          y: "0%",
        }}
        whileInView={{
          x: `calc(-700% + ${x}px)`,
          y: `calc(400% + ${y}px)`,
          rotate: 520,
          transition: {
            bounce: 0,
            duration: 1,
            ease: "easeOut",
          },
        }}
        viewport={{ once: true, amount: 0.9 }}
        css={css`
          position: absolute;
          width: 70px;
          height: 70px;
        `}
      >
        <Image
          src="/images/writingToolsIcon/star_red_rotate.png"
          width={70}
          height={70}
          alt="연필"
        ></Image>
      </motion.div>
      <motion.div
        initial={{
          x: "0%",
          y: "0%",
        }}
        whileInView={{
          x: `calc(-1200% + ${x}px)`,
          y: `calc(200% + ${y}px)`,
          rotate: 90,
          transition: {
            bounce: 0,
            duration: 1,
            ease: "easeOut",
          },
        }}
        viewport={{ once: true, amount: 0.9 }}
        css={css`
          position: absolute;
          width: 20px;
          height: 20px;
        `}
      >
        <Image
          src="/images/writingToolsIcon/pencil_colorful.png"
          width={20}
          height={20}
          alt="연필"
        ></Image>
      </motion.div>
      <motion.div
        initial={{
          x: "0%",
          y: "0%",
        }}
        whileInView={{
          x: `calc(-700% + ${x}px)`,
          y: `calc(400% + ${y}px)`,
          rotate: 520,
          transition: {
            bounce: 0,
            duration: 1,
            ease: "easeOut",
          },
        }}
        viewport={{ once: true, amount: 0.9 }}
        css={css`
          position: absolute;
          width: 40px;
          height: 40px;
        `}
      >
        <Image
          src="/images/writingToolsIcon/eraser_white.png"
          width={100}
          height={100}
          alt="연필"
        ></Image>
      </motion.div>
      <motion.div
        initial={{
          x: "0%",
          y: "0%",
        }}
        whileInView={{
          x: `calc(-0% + ${x}px)`,
          y: `calc(-300% + ${y}px)`,
          rotate: 60,

          transition: {
            bounce: 0,
            duration: 1,
            ease: "easeOut",
          },
        }}
        viewport={{ once: true, amount: 0.9 }}
        css={css`
          position: absolute;
          width: 100px;
          height: 100px;
        `}
      >
        <Image
          src="/images/writingToolsIcon/spiral_book_white.png"
          width={100}
          height={100}
          alt="연필"
        ></Image>
      </motion.div>
      <motion.div
        initial={{
          x: "0%",
          y: "0%",
        }}
        whileInView={{
          x: `calc(400% + ${x}px)`,
          y: `calc(0% + ${y}px)`,
          rotate: 200,
          transition: {
            bounce: 0,
            duration: 1,
            ease: "easeOut",
          },
        }}
        viewport={{ once: true, amount: 0.9 }}
        css={css`
          position: absolute;
          width: 80px;
          height: 80px;
        `}
      >
        <Image
          src="/images/writingToolsIcon/star_red_rotate.png"
          width={70}
          height={70}
          alt="연필"
        ></Image>
      </motion.div>
      <motion.div
        initial={{
          x: "0%",
          y: "0%",
        }}
        whileInView={{
          x: `calc(500% + ${x}px)`,
          y: `calc(350% + ${y}px)`,
          rotate: 520,
          transition: {
            bounce: 0,
            duration: 1,
            ease: "easeOut",
          },
        }}
        viewport={{ once: true, amount: 0.9 }}
        css={css`
          position: absolute;
          width: 30px;
          height: 30px;
        `}
      >
        <Image
          src="/images/writingToolsIcon/pencil_colorful.png"
          width={70}
          height={70}
          alt="연필"
        ></Image>
      </motion.div>
      <motion.div
        initial={{
          x: "0%",
          y: "0%",
        }}
        whileInView={{
          x: `calc(-250% + ${x}px)`,
          y: `calc(-200% + ${y}px)`,
          rotate: 520,
          transition: {
            bounce: 0,
            duration: 1,
            ease: "easeOut",
          },
        }}
        viewport={{ once: true, amount: 0.9 }}
        css={css`
          position: absolute;
          width: 70px;
          height: 70px;
        `}
      >
        <Image
          src="/images/writingToolsIcon/star_red_rotate.png"
          width={70}
          height={70}
          alt="연필"
        ></Image>
      </motion.div>
      <motion.div
        initial={{
          x: "0%",
          y: "0%",
        }}
        whileInView={{
          x: `calc(-200% + ${x}px)`,
          y: `calc(500% + ${y}px)`,
          rotate: 520,
          transition: {
            bounce: 0,
            duration: 1,
            ease: "easeOut",
          },
        }}
        viewport={{ once: true, amount: 0.9 }}
        css={css`
          position: absolute;
          width: 50px;
          height: 50px;
        `}
      >
        <Image
          src="/images/writingToolsIcon/spiral_book_and_pencil.png"
          width={70}
          height={70}
          alt="연필"
        ></Image>
      </motion.div>
    </Box>
  );
}
