import type { Stage } from "../model/stage";
import StageStateCheckbox from "./StageStateCheckbox";
import "./styles/QuestStage.css";

type Props = {
  stage: Stage;
};

const QuestStage = ({ stage }: Props) => {
  const pClassName =
    stage.state == "completed"
      ? "completed-stage"
      : stage.state == "prepared"
      ? "prepared-stage"
      : "";

  return (
    <div className="quest-stage-container">
      <StageStateCheckbox state={stage.state} />
      <p className={pClassName}>{stage.description}</p>
    </div>
  );
};
export default QuestStage;
