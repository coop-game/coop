import { Box, Flex } from "@chakra-ui/react";
import { css } from "@emotion/react";
import User from "./User";

export type userProfileType = {
  id: string;
  nickname: string;
};

type UsersPropsType = {
  userProfiles: Array<userProfileType>;
};
const Users = ({ userProfiles }: UsersPropsType) => {
  return (
    <Flex
      flexDirection={{ base: "row", md: "column" }}
      justifyContent="center"
      w={{ base: "100%", md: "250px", xl: "350px" }}
      h={{ base: "100px", md: "100%", xl: "100%" }}
      overflowX={{ base: "scroll", md: "hidden" }}
      overflowY={{ base: "hidden", md: "scroll" }}
      bgColor={"#E2E0A5"}
      border="3px solid gray"
      boxShadow="dark-lg"
      rounded="md"
    >
      {userProfiles.map((userProfile, idx) => {
        return (
          <div key={userProfile.id + idx}>
            <User userProfile={userProfile} />
          </div>
        );
      })}
    </Flex>
  );
};
export default Users;
