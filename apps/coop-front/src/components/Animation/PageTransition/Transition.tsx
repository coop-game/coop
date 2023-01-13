import { css } from "@emotion/react";
import { useEffect, useState } from "react";

import {
  TransitionGroup,
  Transition as ReactTransition,
} from "react-transition-group";

import styles from "./Transition.module.scss";
import BackgroundNote from "@components/layout/backgroundNote";
import { Flex, useColorMode, useColorModeValue } from "@chakra-ui/react";

type TransitionKind<RC> = {
  children: RC;
  location: string;
};
type PageTurningAnimation<RC> = {
  children: RC;
  transitionState: string;
};

const duration = 1000;

const PageTurningAnimation = ({
  children,
  transitionState,
}: PageTurningAnimation<React.ReactNode>) => {
  const [isTurn, setIsTurn] = useState<boolean>(false);

  const color = useColorModeValue("white", "#1b0c5f");

  useEffect(() => {
    setIsTurn(transitionState === "exiting");
  }, [transitionState]);

  return (
    <div
      css={css`
        position: absolute;
        z-index: 10;
        width: 100vw;
        height: 100vh;
        overflow-x: hidden;
      `}
    >
      <div
        className={styles.root}
        css={css`
          width: 100%;
          height: 100%;
        `}
      >
        <div className="book">
          <Flex
            className={`${isTurn ? styles.flipOut : styles.flipIn}`}
            css={css`
              width: 100%;
              height: 100%;
            `}
          >
            <Flex
              className={`${isTurn ? styles.scaleOut : ""}`}
              bg={color}
              css={css`
                width: 100%;
                height: 100%;
              `}
            >
              <BackgroundNote></BackgroundNote>
              <Flex className={`book__page`}>{children}</Flex>
            </Flex>
          </Flex>
        </div>
      </div>
    </div>
  );
};

const Transition = ({
  children,
  location,
}: TransitionKind<React.ReactNode>) => {
  return (
    <>
      <TransitionGroup style={{ position: "relative" }}>
        <ReactTransition key={location} timeout={duration}>
          {(status: string) => (
            <PageTurningAnimation transitionState={status}>
              {children}
            </PageTurningAnimation>
          )}
        </ReactTransition>
      </TransitionGroup>
    </>
  );
};
export default Transition;
