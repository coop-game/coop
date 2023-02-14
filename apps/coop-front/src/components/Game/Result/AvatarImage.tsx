import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { CPGameRelayRaceAnswer } from "@types";

const AvatarImage = ({
  userProfile,
}: {
  userProfile: CPGameRelayRaceAnswer;
}) => {
  return (
    <Flex
      w={"100%"}
      h={"fit-content"}
      alignItems={"center"}
      direction="column"
      mt={3}
    >
      <Avatar
        size={"xl"}
        css={css`
          border-radius: 100%;
          border: 3px solid ${userProfile.color};
        `}
        src={`/images/avatar/${userProfile.avatarIndex}.png`}
      ></Avatar>
      <Box ml="3" display={"block"}>
        <Text fontWeight={"bold"}>{userProfile.nickname}</Text>
      </Box>
    </Flex>
  );
};

export default AvatarImage;
