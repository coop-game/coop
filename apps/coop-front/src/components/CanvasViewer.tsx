import { doc, providerState } from "@common/yjsStore/userStore";
import { TldrawApp, TDShape, TDBinding, Tldraw } from "@coop/draw";
import { css } from "@emotion/react";
import { useCallback, useEffect, useState } from "react";

const CanvasViewer = () => {
  const [app, setApp] = useState<TldrawApp>();
  const yShapes = doc.getMap<TDShape>(`shapes`);
  const yBindings = doc.getMap<TDBinding>("bindings");

  const onMount = useCallback((app: TldrawApp) => {
    app.loadRoom(providerState.provider.roomName);
    app.pause();
    setApp(app);
  }, []);

  useEffect(() => {
    function handleChanges() {
      app?.replacePageContent(
        Object.fromEntries(yShapes.entries()),
        Object.fromEntries(yBindings.entries()),
        {}
      );
    }
    yShapes.observeDeep(handleChanges);
    handleChanges();

    return () => {
      yShapes.unobserveDeep(handleChanges);
    };
  }, [app, yBindings, yShapes]);

  return (
    <div
      css={css`
        position: relative;
        width: 100%;
        height: 100%;
      `}
    >
      <Tldraw
        showMenu={false}
        showPages={false}
        showUI={false}
        readOnly={true}
        onMount={onMount}
      />
    </div>
  );
};
export default CanvasViewer;
