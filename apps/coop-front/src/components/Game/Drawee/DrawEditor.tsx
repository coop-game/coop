import { Box, useColorMode } from "@chakra-ui/react";
import {
  userSelector,
  yjsGameState,
  transitionPageAnimationState,
} from "@common/recoil/recoil.atom";
import { providerState } from "@common/yjsStore/userStore";
import { Tldraw } from "@coop/draw";
import { useMultiplayerState } from "@hooks/useMultiplayerState";
import { useRecoilValue } from "recoil";
import NewCursor, { CursorComponent } from "../../Tldraw/NewCursor";

type drawEditorPropsType = {
  pageIndex: number;
  useOnChangePresence?: boolean;
  useSideBarDraw?: boolean;
  CurrentQuestionNumber?: React.ReactNode;
};

const DrawEditor = ({
  pageIndex,
  useOnChangePresence = true,
  useSideBarDraw = true,
  CurrentQuestionNumber,
}: drawEditorPropsType) => {
  const userState = useRecoilValue(userSelector);
  const gameState = useRecoilValue(yjsGameState);
  const { onMount, onChangePage, onUndo, onRedo, onChangePresence } =
    useMultiplayerState({
      color: userState?.color,
      provider: providerState?.provider,
      room: providerState?.room,
      customUserId: userState?.nickname,
      pageIndex,
    });

  const isAnimationEnd = useRecoilValue(transitionPageAnimationState);
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      {providerState.provider !== null && isAnimationEnd && (
        <Tldraw
          showMenu={false}
          // autofocus
          // disableAssets
          showPages={false}
          onMount={onMount}
          onChangePage={onChangePage}
          onUndo={onUndo}
          onRedo={onRedo}
          {...(useOnChangePresence
            ? { onChangePresence: onChangePresence }
            : {})}
          darkMode={colorMode !== "light"}
          // disableAssets={true}
          components={
            useSideBarDraw === true
              ? {
                  Cursor: NewCursor as CursorComponent,
                  CurrentQuestionNumber,
                }
              : {}
          }
        />
      )}
    </>
  );
};
export default DrawEditor;
