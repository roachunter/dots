import type { StageState } from "../model/stage";

type Props = {
  state: StageState;
};

const StageState = ({ state }: Props) => {
  const imageSrc = state == "current" ? "../../assets/current-mark.svg" : state == "completed" ? "../../assets/completed-mark.svg"
  return <div></div>;
};
export default StageState;
