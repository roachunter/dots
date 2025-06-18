import type { Quest } from "../model/quest";
import "./styles/QuestDropdownItem.css";

type Props = {
  quest: Quest;
  selected: boolean;
  onClick: (quest: Quest) => void;
};

const QuestDropdownItem = ({ quest, selected, onClick }: Props) => {
  return (
    <div className="quest-dropdown-item ticket-border-light-gradient-horizontal">
      <div className="quest-dropdown-item-text">
        <h3>{quest.title}</h3>
        <p>Realm</p>
      </div>
    </div>
  );
};
export default QuestDropdownItem;
