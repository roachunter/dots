import type { Quest } from "../model/quest";
import type { Realm } from "../model/realm";
import QuestDropdown from "./QuestDropdown";

type Props = {
  realms: Realm[];
  selectedQuest: Quest | null;
  onQuestClick: (realm: Realm, quest: Quest) => void;
};

const QuestDropdowns = ({ realms, selectedQuest, onQuestClick }: Props) => {
  return <div className="quest-dropdowns-container">
    {realms.map((realm) => (
      <QuestDropdown realm={realm} selectedQuest={selectedQuest} onQuestClick={onQuestClick} />
    ))}
  </div>;
};
export default QuestDropdowns;
