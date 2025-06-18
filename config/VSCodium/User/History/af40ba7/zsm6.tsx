import type { Stage } from "../model/stage";
import "./styles/QuestStage.css";

type Props = {
  stage: Stage;
};

const QuestStage = ({ stage }: Props) => {
  return (
    <div className="quest-stage-container">
      ${stage.state}-{stage.description}
    </div>
  );
};
export default QuestStage;
