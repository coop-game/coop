import { Button, Flex, Stack, Tooltip } from "@chakra-ui/react";
import { css } from "@emotion/react";
import Image from "next/image";
import { RepeatIcon } from "@chakra-ui/icons";
import { useTranslation } from "next-i18next";

const AvatarImage = ({
  avatarIndex,
  borderColor,
  randomAvatarHandler,
}: {
  avatarIndex: number;
  borderColor: string;
  randomAvatarHandler?: () => void;
}) => {
  const { t } = useTranslation("common");
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
