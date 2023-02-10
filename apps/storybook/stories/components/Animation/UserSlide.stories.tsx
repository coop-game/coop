import { Box, Flex } from "@chakra-ui/react";
import {
  userProfilesSelector,
  yjsRelayRaceAnswerState,
} from "@common/recoil/recoil.atom";
import SideUserBar from "@components/Game/Result/RelayRace/SideUserBar";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export default {
  title: "animations/SlideUser",
  component: SideUserBar,
  argTypes: {
    nowPageIndex: {
      options: [0, 1],
      control: { type: "radio" },
    },
  },
};

const MockUserProfiles = ({ args }) => {
  const [_, setUserProfiles] = useRecoilState(userProfilesSelector);
  const [aa, setRelayRaceState] = useRecoilState(yjsRelayRaceAnswerState);

  useEffect(() => {
    setUserProfiles({
      isOwner: true,
      userProfiles: [
        {
          id: 0,
          nickname: "0",
          isBanned: false,
          avatarIndex: 1,
          color: "#000",
        },
        {
          id: 1,
          nickname: "1",
          isBanned: false,
          avatarIndex: 2,
          color: "#000",
        },
        {
          id: 2,
          nickname: "2",
          isBanned: false,
          avatarIndex: 3,
          color: "#000",
        },
        {
          id: 3,
          nickname: "3",
          isBanned: false,
          avatarIndex: 4,
          color: "#000",
        },
        {
          id: 4,
          nickname: "4",
          isBanned: false,
          avatarIndex: 0,
          color: "#000",
        },
      ],
    });

    setRelayRaceState([
      {
        id: 0,
        isDraw: false,
        answer: "1",
        avatarIndex: 1,
        nickname: "1",
        color: "#000",
      },
      {
        id: 1,
        isDraw: false,
        answer: "1",
        avatarIndex: 2,
        nickname: "2",
        color: "#000",
      },
      {
        id: 2,
        isDraw: false,
        answer: "1",
        avatarIndex: 3,
        nickname: "3",
        color: "#000",
      },
      {
        id: 3,
        isDraw: false,
        answer: "1",
        avatarIndex: 4,
        nickname: "4",
        color: "#000",
      },
      {
        id: 4,
        isDraw: false,
        answer: "1",
        avatarIndex: 5,
        nickname: "5",
        color: "#000",
      },
    ]);
  }, []);
  return (
    <Flex
      w="20%"
      height="900px"
      overflow={"hidden"}
      position={"absolute"}
      maxH="920px"
      maxW="1200px"
      flexDirection={{ sm: "column-reverse", md: "column-reverse", lg: "row" }}
      marginTop="1%"
    >
      <Box
        w="20%"
        h="300px"
        flex={{ base: 3, lg: 2 }}
        marginRight={{ base: "0%", lg: "3%" }}
      >
        <SideUserBar nowPageIndex={args.nowPageIndex} />
      </Box>
    </Flex>
  );
};

const Template = (args) => <MockUserProfiles args={args} />;

export const Primary = Template.bind({});

Primary.args = {
  nowPageIndex: 0,
};
