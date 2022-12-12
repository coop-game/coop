import { useFileSystem } from "@coop/draw";
import dynamic from "next/dynamic";
import  {useMultiplayerState, useYjs}  from "./../hooks/useMultiplayerState";
import React, { useEffect, useMemo } from "react";
import { nanoid } from "nanoid";
// import useYjs from "src/hooks/useYjs";

const Tldraw = dynamic(() => import("@coop/draw").then((mod) => mod.Tldraw), {
  ssr: false,
});

function Editor({ roomId }: { roomId: string }) {
  const { 
    onNewProject,
    onSaveProject,
    onSaveProjectAs,
    onOpenProject,
    onOpenMedia
  } = useFileSystem();


  const yjs = useYjs(roomId)
  const { 
    onMount,
    onChangePage,
    onUndo,
    onRedo,
    onChangePresence
   } = useMultiplayerState({roomId});
  
  return (
    <div>
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
        onNewProject={onNewProject}
        onSaveProject={onSaveProject}
        onSaveProjectAs={onSaveProjectAs}
        onOpenProject={onOpenProject}
        onOpenMedia={onOpenMedia}
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
