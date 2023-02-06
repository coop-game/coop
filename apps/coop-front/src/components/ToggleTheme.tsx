import { Button, css, useColorMode, useTheme } from "@chakra-ui/react";
import { useEffect } from "react";

const ToggleTheme = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const theme = useTheme();
  // useEffect(() => {
  //   console.log("theme", theme);
  // }, []);
  return (
    <div
      css={css`
        width: 500px;
      `}
    >
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>
    </div>
  );
};
export default ToggleTheme;
