import type { Quest } from "../model/quest";
import type { Realm } from "../model/realm";

type Props = {
  realms: Realm[];
  selectedQuest: Quest | null;
  onQuestClick: (realm: Realm, quest: Quest) => void;
};

const QuestDropdowns = () => {
  return <div>QuestDropdowns</div>;
};
export default QuestDropdowns;
