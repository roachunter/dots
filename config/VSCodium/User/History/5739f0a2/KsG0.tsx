import type { Quest } from "../model/quest";

type Props = {
  quest: Quest | null;
};

const QuestStages = ({ quest }: Props) => {
  return (
    <>
      { quest ? (
        <div></div>
      ) : (
        <div>
          Select a quest
        </div>
      ) }    
      
    </>
  );
};
export default QuestStages;
