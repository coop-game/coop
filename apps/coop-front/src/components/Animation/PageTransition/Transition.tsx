import {
  TransitionGroup,
  Transition as ReactTransition,
} from "react-transition-group";

import React from "react";
import PageTurningAnimation from "./PageTurningAnimation";

type TransitionKind<RC> = {
  children: RC;
  location: string;
  duration?: number;
};

const Transition = ({
  children,
  location,
  duration = 1000,
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
