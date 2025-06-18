import { useState } from "react";
import useQuestStore from "../state/questStore";
import QuestDropdown from "./QuestDropdown";
import "./styles/QuestDropdowns.css";

const QuestDropdowns = () => {
  const realms = useQuestStore((state) => state.realms);

  const [isDialogOpened, setisDialogOpen] = useState(false);
  const handleClick = () => {
    setisDialogOpen(true);
  };

  return (
    <>
      <button className="ticket-container-dark" onClick={handleClick}>
        Button
      </button>
      <dialog open={isDialogOpened}>Bebra</dialog>

      <div className="quest-dropdowns-container">
        {realms.map((realm) => (
          <QuestDropdown key={realm.id} realm={realm} />
        ))}
      </div>
    </>
  );
};
export default QuestDropdowns;
