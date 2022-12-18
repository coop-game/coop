import { Avatar, Flex, Text, Badge, Box, css } from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/react";
import AvatarImage from "@components/AvatarImage";
import { CPUserProfile } from "@types";
import { useState } from "react";

const User = ({ userProfile }: { userProfile: CPUserProfile }) => {
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
          <Avatar
            css={css`
              border-radius: 100%;
              background: rgb(200, 100, 100, 30%);
              border: 3px solid rgb(200, 100, 100, 70%);
            `}
            src={`./images/avatar/${userProfile.avatarIndex}.png`}
          />
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
