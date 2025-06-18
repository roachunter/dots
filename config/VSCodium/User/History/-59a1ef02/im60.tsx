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
          {quests.map((quest) => (
            <QuestDropdownItem
              key={quest.title} // TODO: add id to quests
              quest={quest}
              selected={selectedQuest == quest}
              onClick={onQuestClick}
            />
          ))}
        </div>
      </details>
    </div>
  );
};
export default QuestDropdown;
