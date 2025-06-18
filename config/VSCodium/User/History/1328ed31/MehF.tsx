import type { Quest } from "../model/quest";

type Props = {
  quest: Quest;
};

const QuestDropdownItem = ({ quest }: Props) => {
  return <div className="quest-dropdown-item">
    <div className="quest-dropdown-item-text">
      <h3>{quest.title}</h3>
      <p>Realm</p>
    </div>
  </div>;
};
export default QuestDropdownItem;
