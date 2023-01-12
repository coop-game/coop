import { css } from "@emotion/react";
import { useEffect, useState } from "react";

import {
  TransitionGroup,
  Transition as ReactTransition,
} from "react-transition-group";

import styles from "./Transition.module.scss";

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
  useEffect(() => {
    setIsTurn(transitionState === "exiting");
  }, [transitionState]);

  return (
    <div
      css={css`
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
      `}
    >
      <div className={styles.root}>
        <div className="cover">
          <div className="book">
            <div
              className={`${isTurn ? styles.flipOut : styles.flipIn}`}
              css={css`
                width: 100%;
                height: 100%;
              `}
            >
              <div
                className={`book__page book__page--1 ${
                  isTurn ? styles.scaleOut : ""
                }`}
              >
                <div className={`book__page-front`}>{children}</div>
              </div>
            </div>
          </div>
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
