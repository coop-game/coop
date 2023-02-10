/** @jsxImportSource @emotion/react */
import SideMenuModal from "@components/Modal/SideMenuModal";
import { transitionPageAnimationState } from "@common/recoil/recoil.atom";
import { useRecoilState } from "recoil";
import { css } from "@emotion/react";
export default {
  title: "Modal/SideMenuModal",
  component: SideMenuModal,
};

const Template = (args) => {
  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
        position: relative;
      `}
    >
      <SideMenuModal />
    </div>
  );
};

export const Primary = Template.bind({});
