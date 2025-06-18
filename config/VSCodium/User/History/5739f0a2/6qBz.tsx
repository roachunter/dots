import type { Quest } from "../model/quest";
import QuestStage from "./QuestStage";
import "./styles/QuestStages.css";

type Props = {
  quest: Quest | null;
};

const QuestStages = ({ quest }: Props) => {
  return (
    <>
      {quest ? (
        <>
          div
        </>
      ) : (
        <div>Select a quest</div>
      )}
    </>
  );
};
export default QuestStages;
