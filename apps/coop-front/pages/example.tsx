import Rollinghexagone from "@components/Animation/RollingHexagone";
import RollingSelect from "@components/Animation/RollingSelect";
import ChakraModal from "@components/Modal/ChakraModal";

const Example = () => {
  return (
    <>
      <RollingSelect></RollingSelect>
      <Rollinghexagone></Rollinghexagone>
      <ChakraModal onCloseHandler={() => {}}>
        <div>정답!</div>
        <div>???? 이 정답을 맞췄습니다</div>
      </ChakraModal>
    </>
  );
};
export default Example;
