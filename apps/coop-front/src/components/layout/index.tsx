import { Flex } from "@chakra-ui/react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex className="test" w={"100%"} h={"100%"} p={{ base: "0em", md: "0em" }}>
      <Flex
        direction={{ base: "column" }}
        w={"100%"}
        h={"100%"}
        rounded="md"
        position="relative"
      >
        {children}
      </Flex>
    </Flex>
  );
};
export default Layout;
