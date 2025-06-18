import type { Quest } from "../model/quest";

type Props = {
  quest: Quest | null;
};

const QuestStages = ({ quest }: Props) => {
  return (
    <>
      { quest ? (
        <div className="ticket-container-yellow">
          {quest.title}
        </div>
      ) : (
        <div>
          Select a quest
        </div>
      ) }    
      
    </>
  );
};
export default QuestStages;
