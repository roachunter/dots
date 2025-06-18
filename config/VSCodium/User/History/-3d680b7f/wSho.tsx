import type { StageState } from "../model/stage";

type Props = {
  state: StageState;
};

const StageState = ({ state }: Props) => {
  const [imageSrc, alt]: [string | null, string] =
    state == "current"
      ? ["../../assets/current-mark.svg", current]
      : state == "completed"
      ? "../../assets/completed-mark.svg"
      : null;

  return <div className="ticket-border-solid">
    { imageSrc && (
      <img src={imageSrc} alt="" />
    ) }
  </div>;
};
export default StageState;
