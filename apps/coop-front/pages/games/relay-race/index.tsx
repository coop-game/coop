import { Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";

const Main = () => {
  const RelayRaceStart = dynamic(
    import("@components/relay-race/RelayRaceStart")
  );
  return (
    <Box w="100%" h="100%" minHeight="95vh" position={"relative"}>
      <RelayRaceStart />
    </Box>
  );
};
export default Main;
