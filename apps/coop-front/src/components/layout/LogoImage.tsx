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
      p={{ base: "10px", md: `${heightPadding}px` }}
      height={{ base: height - 50, md: `${heightPadding * 2 + height}px` }}
      width={{ base: height - 50, md: `${heightPadding * 2 + height}px` }}
      justifyContent={"center"}
      alignSelf="center"
    >
      <Image src={src} width={width} height={height} alt="로고이미지" />
    </Flex>
  );
};
export default LogoImage;
