import type { Stage } from "../model/stage";

type Props = {
  stage: Stage;
};

const QuestStage = ({ stage }: Props) => {
  return (
    <div>
      ${stage.state}-{stage.description}
    </div>
  );
};
export default QuestStage;
