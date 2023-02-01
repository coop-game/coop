import { Button } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

const Swoosh = () => {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current !== null) {
      console.log(ref.current);
      ref.current.play();
    }
  }, [ref.current]);
  return (
    <>
      <div>
        <audio
          ref={ref}
          autoPlay
          controls
          loop={false}
          onLoadedData={() => {
            ref.current.play();
          }}
        >
          <source src="/sound/Swoosh.mp3" type="audio/mpeg" />
        </audio>
        <Button
          onClick={() => {
            ref.current.play();
          }}
        ></Button>
      </div>
    </>
  );
};
export default Swoosh;
