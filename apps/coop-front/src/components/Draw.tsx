import { useFileSystem } from "@coop/draw";
import dynamic from "next/dynamic";
import { useMultiplayerState } from "./../hooks/useMultiplayerState";
import { roomID } from "./../store";
import React, { useEffect } from "react";

const Tldraw = dynamic(() => import("@coop/draw").then((mod) => mod.Tldraw), {
  ssr: false,
});

function Editor({ roomId }: { roomId: string }) {
  const fileSystemEvents = useFileSystem();
  const { onMount, ...events } = useMultiplayerState(roomId);

  return (
    <div>
      <Tldraw
        showMenu={false}
        autofocus
        disableAssets
        showPages={false}
        onMount={onMount}
        {...fileSystemEvents}
        {...events}
      />
    </div>
  );
}

export default function Draw() {
  return (
    <div className="tldraw">
      <Editor roomId={roomID} />
    </div>
  );
}
