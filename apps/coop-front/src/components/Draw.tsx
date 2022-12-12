import { useFileSystem } from "@coop/draw";
import dynamic from "next/dynamic";
import  {useMultiplayerState}  from "./../hooks/useMultiplayerState";
import React, { useEffect, useMemo } from "react";
import { nanoid } from "nanoid";
// import useYjs from "src/hooks/useYjs";

const Tldraw = dynamic(() => import("@coop/draw").then((mod) => mod.Tldraw), {
  ssr: false,
});

function Editor({ roomId }: { roomId: string }) {
  const fileSystemEvents = useFileSystem();
  // const {  
  //   awareness,
  //   doc,
  //   provider,
  //   undoManager,
  //   yBindings,
  //   yShapes
  // } = useYjs(roomId);
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
  const roomId = nanoid();
  console.log("provider",roomId)
  return (
    <div className="tldraw">
      <Editor roomId={roomId} />
    </div>
  );
}
