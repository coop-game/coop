import { Button, Flex, Stack, Tooltip } from "@chakra-ui/react";
import { css } from "@emotion/react";
import Image from "next/image";
import { RepeatIcon } from "@chakra-ui/icons";
import { useTranslation } from "next-i18next";
import { motion, useAnimationControls } from "framer-motion";
import { transitionPageAnimationState } from "@common/recoil/recoil.atom";
import { useRecoilValue } from "recoil";

const AvatarImage = ({
  avatarIndex,
  borderColor,
  randomAvatarHandler,
}: {
  avatarIndex: number;
  borderColor: string;
  randomAvatarHandler?: () => void;
}) => {
  const isAnimationend = useRecoilValue(transitionPageAnimationState);

  const { t } = useTranslation("common");
  const controls = useAnimationControls();
  return (
    <Flex
      className="avatar_image"
      flexGrow={1}
      flexDirection="column"
      justifyContent={"center"}
      alignItems="center"
      width="100%"
      minWidth="200px"
      minHeight="250px"
      gap="10px"
      position="relative"
    >
      <motion.div animate={controls} transition={{ duration: 1 }}>
        <Image
          width={60}
          height={60}
          src={"/images/svg/arrow-bottom.svg"}
          alt={"arrow bottom"}
        ></Image>
      </motion.div>
      <Stack
        width="200px"
        height="200px"
        minWidth="200px"
        minHeight="200px"
        overflow={"hidden"}
        css={css`
          border-radius: 100%;
          background: rgb(200, 100, 100, 30%);
          border: 3px solid ${borderColor};
        `}
      >
        <Image
          width={200}
          height={140}
          src={`/images/avatar/${avatarIndex}.png`}
          alt={`${avatarIndex}`}
        ></Image>
      </Stack>
      {randomAvatarHandler && (
        <Tooltip label={t("tooltip.hover.profile.change")}>
          <Button
            boxShadow={"base"}
            aria-label={t("tooltip.hover.profile.change")}
            onMouseEnter={() => {
              controls.start({
                rotateY: 360,
                translateY: [0, 15, 0, 15, 0],
              });
            }}
            onMouseLeave={() => {
              controls.start("hidden");
              controls.start({
                rotateY: 0,
                translateY: 0,
                transition: { duration: 0 },
              });
            }}
            css={css`
              position: absolute;
              right: 0;
              bottom: 0;
              background: #c5deda;
              &:hover {
                & > svg {
                  transform: rotate(-360deg);
                  transition-duration: 1s;
                }
              }
            `}
            onClick={randomAvatarHandler}
          >
            <RepeatIcon
              css={css`
                width: 25px;
                height: 25px;
              `}
            />
          </Button>
        </Tooltip>
      )}
    </Flex>
  );
};
export default AvatarImage;
7;
