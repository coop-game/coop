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
import * as ScrollArea from "@radix-ui/react-scroll-area";

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
    <>
      <StyledTopPanel className="StyledTopPanel">
        <ScrollArea.Root className="ScrollAreaRoot">
          <ScrollArea.Viewport className="ScrollAreaViewport">
            <StyledPanelContent>
              <MenuGrid>
                <ToolButton>
                  <UndoIcon onClick={app.undo} />
                </ToolButton>
                <ToolButton>
                  <UndoIcon onClick={app.redo} flipHorizontal />
                </ToolButton>
                <StyleMenu />
                <PrimaryTools />
              </MenuGrid>
            </StyledPanelContent>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            className="ScrollAreaScrollbar"
            orientation="vertical"
          >
            <ScrollArea.Thumb className="ScrollAreaThumb" />
          </ScrollArea.Scrollbar>
          <ScrollArea.Scrollbar
            className="ScrollAreaScrollbar"
            orientation="horizontal"
          >
            <ScrollArea.Thumb className="ScrollAreaThumb" />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner className="ScrollAreaCorner" />
        </ScrollArea.Root>
      </StyledTopPanel>
    </>
  );
}

const MenuGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(2, auto)",
  justifyItems: "center",
  gap: "3px",
});

const StyledPanelContent = styled("div", {
  // background:"white",
  shadows: "0px 12px 17px rgba(0, 0, 0, 1)",
  // borderRadius: 3,
  // padding: '$3 $3 $3 $3',
});

const StyledTopPanel = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  // pointerEvents: "none",
  "& > *": {
    pointerEvents: "all",
  },
  background: "gray",
  padding: "5px",
  borderRadius: "15px",
  // height: "",
  // overflow: "hidden scroll",
});

export const TopPanel = React.memo(_TopPanel);
