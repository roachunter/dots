import type { Quest } from "../model/quest";
import "./styles/QuestStages.css";

type Props = {
  quest: Quest | null;
};

const QuestStages = ({ quest }: Props) => {
  return (
    <>
      {quest ? (
        <div className="heading-container">
          <div className="heading-text">
            <h3>{quest.title}</h3>
          </div>
        </div>
      ) : (
        <div>Select a quest</div>
      )}
    </>
  );
};
export default QuestStages;
