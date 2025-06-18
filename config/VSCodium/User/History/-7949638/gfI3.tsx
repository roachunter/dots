import { useState } from "react";
import useQuestStore from "../state/questStore";
import QuestDropdown from "./QuestDropdown";
import "./styles/QuestDropdowns.css";

const QuestDropdowns = () => {
  const realms = useQuestStore((state) => state.realms);

  const [openDialog, setOpenDialog] = useState(false);
  const handleClick = () => {
    setOpenDialog(true)
  }

  return (
    <>
      <button className="ticket-container-dark" popoverTarget="add-realm-popover">
        Button
      </button>
      <dialog open={openDialog}>Bebra</dialog>
      
      <div className="quest-dropdowns-container">
        {realms.map((realm) => (
          <QuestDropdown key={realm.id} realm={realm} />
        ))}
      </div>
    </>
  );
};
export default QuestDropdowns;
