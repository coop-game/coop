import { Box } from "@chakra-ui/react";
import useObserver from "hooks/useObserver";
import { useEffect } from "react";

function MiddleContentScrollDetector({
  detectComponent,
  index,
}: {
  detectComponent: ({
    index,
    viewport,
  }: {
    index: number;
    viewport: boolean;
  }) => void;
  index: number;
}) {
  const { targetRef, isDetect } = useObserver();
  useEffect(() => {
    if (isDetect) {
      detectComponent({ index, viewport: isDetect });
    }
  }, [isDetect]);
  return (
    <Box w="100%" h="100vh">
      <div ref={targetRef}></div>
    </Box>
  );
}

export default MiddleContentScrollDetector;
