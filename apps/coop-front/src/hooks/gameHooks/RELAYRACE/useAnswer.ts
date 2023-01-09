import { yjsRelayRaceAnswerState } from "@common/recoil/recoil.atom";
import { providerState } from "@common/yjsStore/userStore";
import { useRecoilState } from "recoil";

const useAnswer = () => {
    
    const [_, setRelayRaceAnswerState] = useRecoilState(yjsRelayRaceAnswerState);

    const { provider } = providerState;
    

}

export default useAnswer;