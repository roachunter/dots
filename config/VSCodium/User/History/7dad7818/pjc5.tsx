import { useRef } from "react";

const NewStageButton = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleButtonClick = () => {};

  return (
    <>
      <button
        className="new-quest-btn ticket-container-dark"
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

          <label htmlFor="realm-select">Realm</label>
          <select
            value={newQuestRealm?.id}
            onChange={handleRealmSelect}
            name="realm-select"
          >
            {realms.map((realm) => (
              <option key={realm.id} value={realm.id}>
                {realm.title}
              </option>
            ))}
          </select>

          <label htmlFor="new-quest-title">Title</label>
          <input
            type="text"
            value={newQuestTitle}
            onChange={handleTitleChange}
            name="new-quest-title"
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
