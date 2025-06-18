import type { Quest } from "../model/quest";

type Props = {
  quest: Quest | null;
};

const QuestDescription = ({ quest }: Props) => {
  return <>{quest ? <p></p> : <></>}</>;
};
export default QuestDescription;
