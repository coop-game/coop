import { Flex } from "@chakra-ui/react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex w={"100%"} h={"100vh"} p={"3em"}>
      <Flex
        direction={{ base: "column" }}
        w={"100%"}
        h={"100%"}
        minHeight={"800px"}
        border="3px solid gray"
        boxShadow="dark-lg"
        rounded="md"
      >
        {children}
      </Flex>
    </Flex>
  );
};
export default Layout;
