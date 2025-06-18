import { useRef, useState, type MouseEvent } from "react";
import "./styles/QuestButton.css";

const NewStageButton = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [stageDescription, setStageDescription] = useState("");

  const handleButtonClick = () => {
    dialogRef.current?.showModal();
  };

  const handleClickOutsideDialog = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target == dialogRef.current) {
      dialogRef.current?.close();
    }
  };

  return (
    <>
      <button
        className="quest-btn ticket-container-dark"
        onClick={handleButtonClick}
      >
        New Stage
      </button>
      <dialog
        className="new-quest-dialog"
        ref={dialogRef}
        onClick={handleClickOutsideDialog}
      >
        <form
          onSubmit={handleSubmit}
          className="new-quest-dialog-form ticket-container-dark"
        >
          <h3>New Quest</h3>

          <label htmlFor="new-stage-description">Description</label>
          <input
            type="text"
            value={newQuestTitle}
            onChange={handleTitleChange}
            name="new-stage-description"
          />
          {titleError}

          <div className="new-quest-dialog-buttons">
            <button
              type="button"
              onClick={handleCancel}
              className="ticket-container-dark"
            >
              Cancel
            </button>
            <button type="submit" className="ticket-container-dark">
              Start
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
};
export default NewStageButton;
