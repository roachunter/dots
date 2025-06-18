import type { Stage } from "../model/stage";
import StageState from "./StageStateCheckbox";
import "./styles/QuestStage.css";

type Props = {
  stage: Stage;
};

const QuestStage = ({ stage }: Props) => {
  return (
    <div className="quest-stage-container">
      <StageState state={stage.state} />
      <p>{stage.description}</p>
    </div>
  );
};
export default QuestStage;
