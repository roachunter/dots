import type { Quest } from "../model/quest";
import QuestDropdownItem from "./QuestDropdownItem";
import "./styles/QuestDropdown.css";

type Props = {
  quests: Quest[];
  selectedQuest: Quest | null;
  onQuestClick: (quest: Quest) => void;
};

const QuestDropdown = ({ quests, selectedQuest, onQuestClick }: Props) => {
  return (
    <div className="dropdown-container">
      <details>
        <summary className="ticket-container-dark">Main Quests</summary>
        <div className="dropdown-content">
          {quests.map((quest) => {
            let props = {
              quest: quest,
              selected: selectedQuest == quest,
              onClick: onQuestClick
            };
            return (
              <QuestDropdownItem
                key={`${quest.title}-${selectedQuest == quest}`} // TODO: add id to quests
                props
              />
            );
          })}
        </div>
      </details>
    </div>
  );
};
export default QuestDropdown;
