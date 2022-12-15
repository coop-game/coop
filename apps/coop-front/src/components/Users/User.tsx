import { Avatar, Flex, Text, Badge, Box, css } from "@chakra-ui/react";
import { userProfileType } from ".";
import { Tooltip } from "@chakra-ui/react";
import { useState } from "react";

type UserPropsType = {
  userProfile: userProfileType;
};

const User = ({ userProfile }: UserPropsType) => {
  const [isLabelOpen, setIsLabelOpen] = useState(false);
  return (
    <Flex
      w={"100%"}
      h={"70px"}
      placeContent={"space-around"}
      alignItems={"center"}
    >
      <Tooltip
        hasArrow
        color="black"
        bg="gray.300"
        label={userProfile.nickname}
        isOpen={isLabelOpen}
      >
        <Flex
          placeContent={"center"}
          flexGrow={3}
          p={3}
          onMouseEnter={() => setIsLabelOpen(true)}
          onMouseLeave={() => setIsLabelOpen(false)}
          onClick={() => setIsLabelOpen(true)}
        >
          <Avatar src="https://bit.ly/sage-adebayo" />
        </Flex>
      </Tooltip>
      <Box ml="3" flexGrow={3} display={{ base: "none", md: "block" }}>
        <Text fontWeight="bold">
          {userProfile.nickname}
          <Badge ml="1" colorScheme="yellow">
            GOLD
          </Badge>
        </Text>
        <Text fontSize="sm">{userProfile.id}</Text>
      </Box>
    </Flex>
  );
};
export default User;
