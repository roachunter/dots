import { useRef, type MouseEventHandler } from "react";
import useQuestStore from "../state/questStore";
import QuestDropdown from "./QuestDropdown";
import "./styles/QuestDropdowns.css";

const QuestDropdowns = () => {
  const realms = useQuestStore((state) => state.realms);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const openDialog = () => {
    dialogRef.current?.showModal();
  };
  const closeDialog = (e: React.MouseEvent<HTMLDialogElement>) => {

    dialogRef.current?.close();
  };

  return (
    <>
      <button className="ticket-container-dark" onClick={openDialog}>
        Button
      </button>
      <dialog ref={dialogRef} onClick={closeDialog} className="test">
        <div>
          Bebra
          <button onClick={closeDialog}>Close</button>
        </div>
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
