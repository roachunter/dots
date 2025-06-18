import type { Stage } from "../model/stage";
import StageState from "./StageState";
import "./styles/QuestStage.css";

type Props = {
  stage: Stage;
};

const QuestStage = ({ stage }: Props) => {
  return (
    <div className="quest-stage-container">
      <StageState
    </div>
  );
};
export default QuestStage;
