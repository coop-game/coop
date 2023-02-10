/** @jsxImportSource @emotion/react */
import { Box, useColorModeValue } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { MutableRefObject, useCallback, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
const ScrollBottomButton = ({
  rootRef,
  input,
}: {
  rootRef: MutableRefObject<any>;
  input: string[];
}) => {
  const [isHover, setIsHover] = useState(false);
  const { t } = useTranslation("common");
  const bg = useColorModeValue("#ffffffb2", "#ffffffb2");

  const eventHandler = useCallback(() => {
    if (
      rootRef.current.scrollTop + rootRef.current.offsetHeight !==
      rootRef.current.scrollHeight
    ) {
      setIsHover(true);
    } else {
      setIsHover(false);
    }
  }, []);

  useEffect(() => {
    rootRef?.current &&
      rootRef.current?.addEventListener("scroll", eventHandler);
    return () => {
      rootRef?.current &&
        rootRef.current?.removeEventListener("scroll", eventHandler);
    };
  }, [eventHandler, rootRef]);

  useEffect(() => {
    if (rootRef && isHover === false) {
      rootRef.current.scrollTop = rootRef.current.scrollHeight;
    }
  }, [input, isHover, rootRef]);

  return (
    <>
      {isHover && (
        <div
          className="ScrollBottomButton"
          css={css`
            position: absolute;
            width: 100%;
            height: 30px;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
          `}
          onClick={() => {
            setIsHover(false);
            rootRef.current.scrollTop = rootRef.current.scrollHeight;
          }}
        >
          <Box
            boxShadow={"base"}
            border="1px"
            borderColor="gray.400"
            css={css`
              border-radius: 8px;
              padding: 0px 3px 0px 3px;
              display: flex;
              justify-content: center;
              border-radius: 8px;
              backdrop-filter: blur(3px);
              gap: 5px;
            `}
          >
            <Image
              width={20}
              height={20}
              src={"/images/stop.svg"}
              alt={"stop icon"}
            />
            <div>{t("draw.answer.history.scroll.down")}</div>
          </Box>
        </div>
      )}
    </>
  );
};
export default ScrollBottomButton;
