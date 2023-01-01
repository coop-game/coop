import { DraweeLogo } from "@asset/images";
import { Flex } from "@chakra-ui/react";
import { StaticImageData } from "next/image";
import Image from "next/image";

type LogoImagePropsType = {
  src: StaticImageData;
  height: number;
  width: number;
  heightPadding: number;
};
const LogoImage = ({
  src,
  width = 150,
  height = 150,
  heightPadding = 25,
}: LogoImagePropsType) => {
  return (
    <Flex
      p={`${heightPadding}px`}
      height={`${heightPadding * 2 + height}px`}
      width={"100%"}
      justifyContent={"center"}
    >
      <Image src={src} width={width} height={height} alt="로고이미지" />
    </Flex>
  );
};
export default LogoImage;
