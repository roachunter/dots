import type { Quest } from "../model/quest";
import QuestDropdownItem from "./QuestDropdownItem";
import "./styles/QuestDropdown.css";

type Props = {
  quests: Quest[];
};

const QuestDropdown = ({ quests }: Props) => {
  return (
    <div className="dropdown-container">
      <details>
        <summary className="ticket-container-dark">Main Quests</summary>
        <div className="dropdown-content">
          {quests.map((quest) => (
            <QuestDropdownItem quest={quest} selected />
          ))}
        </div>
      </details>
    </div>
  );
};
export default QuestDropdown;
