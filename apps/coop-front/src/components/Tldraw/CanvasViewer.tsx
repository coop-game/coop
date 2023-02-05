import { useColorMode } from "@chakra-ui/react";
import { doc, providerState } from "@common/yjsStore/userStore";
import { TldrawApp, TDShape, TDBinding, Tldraw } from "@coop/draw";
import { css } from "@emotion/react";
import { useCallback, useEffect, useState } from "react";
import SideBarOfDraw from "../layout/SideBar/SideBarOfDraw";

type CanvasViewerPropsType = {
  pageIndex: number;
  CurrentQuestionNumber?: React.ReactNode;
};

const CanvasViewer = ({
  pageIndex,
  CurrentQuestionNumber,
}: CanvasViewerPropsType) => {
  const [app, setApp] = useState<TldrawApp>();
  const yShapes = doc.getMap<TDShape>(`shapes ${pageIndex}`);
  const yBindings = doc.getMap<TDBinding>(`bindings ${pageIndex}`);
  const { colorMode } = useColorMode();

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
        darkMode={colorMode !== "light"}
        components={{ CurrentQuestionNumber }}
      />
    </div>
  );
};
export default CanvasViewer;
