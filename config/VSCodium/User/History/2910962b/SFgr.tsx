import type { Quest } from "../model/quest";
import type { Realm } from "../model/realm";

type Props = {
  realms: Realm[];
  selectedQuest: Quest | null;
  onQuestClick: (realm: Realm, quest: Quest) => void;
};

const QuestDropdowns = ({ realms, selectedQuest, onQuestClick }: Props) => {
  return <div className="quest-dropdowns-container">
    {realms.map((realm) => (
      <Que
    ))}
  </div>;
};
export default QuestDropdowns;
