import { useRef, useState } from "react";
import useQuestStore from "../state/questStore";
import QuestDropdown from "./QuestDropdown";
import "./styles/QuestDropdowns.css";

const QuestDropdowns = () => {
  const realms = useQuestStore((state) => state.realms);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const openDialog = () => {
    dialogRef.current?.showModal();
  };
  const closeDialog = () => {
    dialogRef.current?.close();
  };

  return (
    <>
      <button className="ticket-container-dark" onClick={openDialog}>
        Button
      </button>
      <dialog ref={dialogRef} className="test">
        Bebra
        <button onClick={closeDialog}>Close</button>
      </dialog>

      <div className="quest-dropdowns-container">
        {realms.map((realm) => (
          <QuestDropdown key={realm.id} realm={realm} />
        ))}
      </div>
    </>
  );
};
export default QuestDropdowns;
