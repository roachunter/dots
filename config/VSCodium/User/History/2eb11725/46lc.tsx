import type { Quest } from "../model/quest";

type Props = {
  quest: Quest | null;
};

const QuestDescription = ({ quest }: Props) => {
  return (
    <>
      {quest ? <p className="quest-description">{quest.description}</p> : <></>}
    </>
  );
};
export default QuestDescription;
