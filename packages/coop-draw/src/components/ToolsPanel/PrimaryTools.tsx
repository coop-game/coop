import {
  ArrowTopRightIcon,
  CursorArrowIcon,
  ImageIcon,
  Pencil1Icon,
  Pencil2Icon,
  TextIcon,
} from "@radix-ui/react-icons";
import * as React from "react";
import { useIntl } from "react-intl";
import { ToolButton } from "~components/Primitives/ToolButton";
import { EraserIcon } from "~components/Primitives/icons";
import { useTldrawApp } from "~hooks";
import { styled } from "~styles/stitches.config";
import { TDShapeType, TDSnapshot } from "~types";
import { MenuGrid } from "~components/TopPanel/StyleMenu";

const activeToolSelector = (s: TDSnapshot) => s.appState.activeTool;
const dockPositionState = (s: TDSnapshot) => s.settings.dockPosition;

export const PrimaryTools = React.memo(function PrimaryTools() {
  const app = useTldrawApp();
  const intl = useIntl();

  const activeTool = app.useStore(activeToolSelector);

  const dockPosition = app.useStore(dockPositionState);

  const selectSelectTool = React.useCallback(() => {
    app.selectTool("select");
  }, [app]);

  const selectEraseTool = React.useCallback(() => {
    app.selectTool("erase");
  }, [app]);

  const selectDrawTool = React.useCallback(() => {
    app.selectTool(TDShapeType.Draw);
  }, [app]);

  return (
    <MenuGrid id="TD-PrimaryTools">
      <ToolButton
        onClick={selectDrawTool}
        isActive={activeTool === TDShapeType.Draw}
      >
        <Pencil1Icon />
      </ToolButton>

      <ToolButton onClick={selectEraseTool} isActive={activeTool === "erase"}>
        <EraserIcon />
      </ToolButton>
    </MenuGrid>
  );
});
