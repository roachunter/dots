import { useEffect } from "react";
import type { Quest } from "../model/quest";
import "./styles/QuestDropdownItem.css";

type Props = {
  quest: Quest;
  selected: boolean;
  onClick: (quest: Quest) => void;
};

const QuestDropdownItem = (props: Props) => {
  // const className = ;

  useEffect(() => {
    console.log(`quest ${quest.title} is selected: ${selected}`);
  }, [selected, quest.title]);

  return (
    <div
      className={`quest-dropdown-item ${
        selected ? "selected-item" : ""
      } ticket-border-light-gradient-horizontal`}
      onClick={() => {
        onClick(quest);
      }}
    >
      {selected ? (
        <></>
      ) : (
        <div className="quest-dropdown-item-text">
          <h3>{quest.title}</h3>
          <p>Realm</p>
        </div>
      )}
    </div>
  );
};
export default QuestDropdownItem;
