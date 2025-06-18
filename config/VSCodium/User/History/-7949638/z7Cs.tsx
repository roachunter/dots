import { useState } from "react";
import useQuestStore from "../state/questStore";
import QuestDropdown from "./QuestDropdown";
import "./styles/QuestDropdowns.css";

const QuestDropdowns = () => {
  const realms = useQuestStore((state) => state.realms);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleClick = () => {
    setIsDialogOpen(true);
  };

  return (
    <>
      <button className="ticket-container-dark" onClick={handleClick}>
        Button
      </button>
      <dialog open={isDialogOpen}>Bebra</dialog>

      <div className="quest-dropdowns-container">
        {realms.map((realm) => (
          <QuestDropdown key={realm.id} realm={realm} />
        ))}
      </div>
    </>
  );
};
export default QuestDropdowns;
