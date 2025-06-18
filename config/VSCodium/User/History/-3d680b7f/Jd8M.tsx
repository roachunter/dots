import type { StageState } from "../model/stage";

type Props = {
  state: StageState;
};

const StageState = ({ state }: Props) => {
  const imageSrc: string | null =
    state == "current"
      ? "../../assets/current-mark.svg"
      : state == "completed"
      ? "../../assets/completed-mark.svg"
      : null;

  return <div className=""></div>;
};
export default StageState;
