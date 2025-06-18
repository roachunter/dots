import type { Quest } from "../model/quest";
import type { Realm } from "../model/realm";
import QuestDropdownItem from "./QuestDropdownItem";
import "./styles/QuestDropdown.css";

type Props = {
  realms: Realm[];
  selectedQuest: Quest | null;
  onQuestClick: (quest: Quest) => void;
};

const QuestDropdown = ({ realms, selectedQuest, onQuestClick }: Props) => {
  return (
    <div className="dropdown-container">
      <details>
        <summary className="ticket-container-dark">Main Quests</summary>
        <div className="dropdown-content">
          {quests.map((quest) => {
            const props = {
              quest: quest,
              selected: selectedQuest == quest,
              onClick: onQuestClick,
            };
            return (
              <QuestDropdownItem
                key={`${quest.title}-${selectedQuest == quest}`} // TODO: add id to quests
                quest={{ ...props }.quest}
                selected={{ ...props }.selected}
                onClick={{ ...props }.onClick}
              />
            );
          })}
        </div>
      </details>
    </div>
  );
};
export default QuestDropdown;
