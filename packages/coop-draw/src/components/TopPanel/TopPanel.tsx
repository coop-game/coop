import * as React from "react";
import { Panel } from "~components/Primitives/Panel";
import { ToolButton } from "~components/Primitives/ToolButton";
import { UndoIcon } from "~components/Primitives/icons";
import { useTldrawApp } from "~hooks";
import { styled } from "~styles";
import { Menu } from "./Menu/Menu";
import { MultiplayerMenu } from "./MultiplayerMenu";
import { PageMenu } from "./PageMenu";
import { StyleMenu } from "./StyleMenu";
import { ZoomMenu } from "./ZoomMenu";
import { ToolsPanel } from "~components/ToolsPanel";
import { PrimaryTools } from "~components/ToolsPanel/PrimaryTools";

interface TopPanelProps {
  readOnly: boolean;
  showPages: boolean;
  showMenu: boolean;
  showStyles: boolean;
  showZoom: boolean;
  showMultiplayerMenu: boolean;
}

export function _TopPanel({
  readOnly,
  showPages,
  showMenu,
  showStyles,
  showZoom,
  showMultiplayerMenu,
}: TopPanelProps) {
  const app = useTldrawApp();

  return (
    <StyledTopPanel>
      <PanelGrid>
        <ToolButton>
          <UndoIcon onClick={app.undo} />
        </ToolButton>
        <ToolButton>
          <UndoIcon onClick={app.redo} flipHorizontal />
        </ToolButton>
        <ZoomMenu />
      </PanelGrid>
      <StyleMenu />
      <PrimaryTools />
    </StyledTopPanel>
  );
}

const StyledTopPanel = styled("div", {
  width: "150px",
  // position: "absolute",
  top: 0,
  left: 0,

  display: "flex",
  flexDirection: "column",
  pointerEvents: "none",
  "& > *": {
    pointerEvents: "all",
  },
});

export const PanelGrid = styled("div", {
  display: "flex",
  flexDirection: "row",
  placeContent: "center",
  gap: 0,
});

export const TopPanel = React.memo(_TopPanel);
