import type { Quest } from "../model/quest";
import "./styles/QuestDescription.css";

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
