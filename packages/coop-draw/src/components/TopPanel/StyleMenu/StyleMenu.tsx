import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import { ToolButton } from "~components/Primitives/ToolButton";
import {
  CircleIcon,
  SizeLargeIcon,
  SizeMediumIcon,
  SizeSmallIcon,
} from "~components/Primitives/icons";
import { useTldrawApp } from "~hooks";
import { defaultTextStyle, fills, strokes } from "~state/shapes/shared";
import { styled } from "~styles";
import { ColorStyle, ShapeStyles, SizeStyle, TDSnapshot } from "~types";

const currentStyleSelector = (s: TDSnapshot) => s.appState.currentStyle;
const selectedIdsSelector = (s: TDSnapshot) =>
  s.document.pageStates[s.appState.currentPageId].selectedIds;

const STYLE_KEYS = Object.keys(defaultTextStyle) as (keyof ShapeStyles)[];

type SizeStyleExcludeMedium = Exclude<SizeStyle, SizeStyle.Medium>;

const SIZE_ICONS = {
  [SizeStyle.Small]: <SizeSmallIcon />,
  [SizeStyle.Large]: <SizeLargeIcon />,
};

const themeSelector = (s: TDSnapshot) =>
  s.settings.isDarkMode ? "dark" : "light";

export const StyleMenu = React.memo(function ColorMenu() {
  const app = useTldrawApp();

  const theme = app.useStore(themeSelector);

  const currentStyle = app.useStore(currentStyleSelector);

  const selectedIds = app.useStore(selectedIdsSelector);

  const [displayedStyle, setDisplayedStyle] = React.useState(currentStyle);

  const rDisplayedStyle = React.useRef(currentStyle);

  React.useEffect(() => {
    const {
      appState: { currentStyle },
      page,
      selectedIds,
    } = app;
    let commonStyle = {} as ShapeStyles;
    if (selectedIds.length <= 0) {
      commonStyle = currentStyle;
    } else {
      const overrides = new Set<string>([]);
      app.selectedIds
        .map((id) => page.shapes[id])
        .forEach((shape) => {
          STYLE_KEYS.forEach((key) => {
            if (overrides.has(key)) return;
            if (commonStyle[key] === undefined) {
              // @ts-ignore
              commonStyle[key] = shape.style[key];
            } else {
              if (commonStyle[key] === shape.style[key]) return;
              // @ts-ignore
              commonStyle[key] = shape.style[key];
              overrides.add(key);
            }
          });
        });
    }
    if (
      JSON.stringify(commonStyle) !== JSON.stringify(rDisplayedStyle.current)
    ) {
      rDisplayedStyle.current = commonStyle;
      setDisplayedStyle(commonStyle);
    }
  }, [currentStyle, selectedIds]);

  const handleSizeChange = React.useCallback((value: string) => {
    app.style({ size: value as SizeStyle });
  }, []);

  return (
    <>
      <ScrollArea.Root className="ScrollAreaRoot">
        <ScrollArea.Viewport className="ScrollAreaViewport">
          <FormattedMessage id="style.menu.color" />
          <MenuGrid>
            {Object.keys(strokes.light).map((style: string) => (
              <div key={style} id={`TD-Styles-Color-Swatch-${style}`}>
                <ToolButton
                  variant="icon"
                  isActive={displayedStyle.color === style}
                  onClick={() => app.style({ color: style as ColorStyle })}
                >
                  <CircleIcon
                    size={18}
                    strokeWidth={2.5}
                    fill={
                      displayedStyle.isFilled
                        ? fills[theme][style as ColorStyle]
                        : "transparent"
                    }
                    stroke={strokes.light[style as ColorStyle]}
                  />
                </ToolButton>
              </div>
            ))}
          </MenuGrid>
          <FormattedMessage id="style.menu.size" />
          <MenuGrid>
            <ToolButton
              variant="icon"
              isActive={SizeStyle.Small === displayedStyle.size}
              onClick={() => handleSizeChange(SizeStyle.Small)}
            >
              {SIZE_ICONS[SizeStyle.Small as SizeStyleExcludeMedium]}
            </ToolButton>
            <ToolButton
              variant="icon"
              isActive={SizeStyle.Large === displayedStyle.size}
              onClick={() => handleSizeChange(SizeStyle.Large)}
            >
              {SIZE_ICONS[SizeStyle.Large as SizeStyleExcludeMedium]}
            </ToolButton>
          </MenuGrid>
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
    </>
  );
});

export const MenuGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(2, auto)",
  // justifyItems: "center",
  gap: 0,
});
