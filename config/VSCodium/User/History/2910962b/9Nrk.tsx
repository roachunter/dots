import type { Quest } from "../model/quest";
import type { Realm } from "../model/realm";

type Props = {
  realms: Realm[];
  selectedQuest: Quest | null;
  onQuestClick
};

const QuestDropdowns = () => {
  return <div>QuestDropdowns</div>;
};
export default QuestDropdowns;
