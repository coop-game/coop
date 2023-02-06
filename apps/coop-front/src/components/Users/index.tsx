import { Box, Flex, useColorMode } from "@chakra-ui/react";
import { css } from "@emotion/react";
import User from "./User";
import { CPUserProfile } from "@types";
import { useTranslation } from "next-i18next";

type UsersPropsType = {
  userProfiles: Array<CPUserProfile>;
};
const Users = ({ userProfiles }: UsersPropsType) => {
  const { colorMode } = useColorMode();
  const { t } = useTranslation("common");
  return (
    <Flex
      w={{ base: "100%", md: "250px", xl: "350px" }}
      h={{ base: "100px", md: "100%", xl: "100%" }}
      css={css`
        position: relative;
      `}
    >
      <Flex
        display={{ base: "none", md: "flex" }}
        css={css`
          position: absolute;
          top: 0;
          left: 50%;
          transform: translate(-50%);
          font-size: 1.5rem;
          padding: 20px 0px 20px 0px;
        `}
      >
        {t("lobby.users")}
      </Flex>
      <Flex
        flexDirection={{ base: "row", md: "column" }}
        w={{ base: "100%", md: "250px", xl: "350px" }}
        h={{ base: "80px", md: "100%", xl: "100%" }}
        overflowX={{ base: "scroll", md: "hidden" }}
        overflowY={{ base: "hidden", md: "scroll" }}
        bgColor={colorMode === "light" ? "#E2E0A5" : "#b3b18a"}
        boxShadow="dark-lg"
        rounded="md"
        padding={{ base: "0px", md: "60px 0px 20px 0px" }}
      >
        {userProfiles &&
          userProfiles.map((userProfile, idx) => {
            return (
              <User key={userProfile.id + idx} userProfile={userProfile} />
            );
          })}
      </Flex>
    </Flex>
  );
};
export default Users;
