import { useMultiplayerState } from "./../hooks/useMultiplayerState";

import { css } from "@emotion/react";

import NewCursor, { CursorComponent } from "@components/NewCursor";

// import { yjsState } from "@common/recoil/recoil.atom";

import * as Y from "yjs";

import { Tldraw } from "@coop/draw";
import { providerState } from "@common/yjsStore/userStore";
import useProfileUpdate from "@hooks/useProfileUpdate";
import { useRecoilValue } from "recoil";
import { userSelector, yjsGameState } from "@common/recoil/recoil.atom";

function Editor({}) {
  const userState = useRecoilValue(userSelector);
  const { onMount, onChangePage, onUndo, onRedo, onChangePresence } =
    useMultiplayerState({
      provider: providerState?.provider,
      room: providerState?.room,
      customUserId: userState?.nickname,
    });

  return (
    <div
      css={css`
        position: relative;
        width: 80vw;
        height: 80vh;
      `}
    >
      <Tldraw
        showMenu={false}
        // autofocus
        // disableAssets
        showPages={false}
        onMount={onMount}
        onChangePage={onChangePage}
        onUndo={onUndo}
        onRedo={onRedo}
        onChangePresence={onChangePresence}
        components={{ Cursor: NewCursor as any }}
      />
    </div>
  );
}

function Draw() {
  useProfileUpdate();
  const gameState = useRecoilValue(yjsGameState);
  return (
    <>
      <div>{providerState?.provider.roomName}</div>
      <div>gamePages.length : {gameState.gamePages.length}</div>
      <div>gamePagesIndex : {gameState.gamePagesIndex}</div>
      {providerState.provider !== null && (
        <div className="tldraw">
          <Editor />
        </div>
      )}
    </>
  );
}
export default Draw;
