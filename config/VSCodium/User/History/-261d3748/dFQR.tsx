import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type MouseEvent,
} from "react";
import "./styles/QuestButton.css";
import "./styles/QuestDialog.css";
import useQuestStore from "../state/questStore";
import type { Realm } from "../../model/realm";

const useQuestForm = (
  realms: Realm[],
  defaultRealmId?: string,
  defaultTitle?: string,
  defaultStageDescriptions?: string
) => {
  const [realmId, setRealmId] = useState(defaultRealmId || realms[0]?.id || "");
  const [title, setTitle] = useState(defaultTitle || "");
  const [titleError, setTitleError] = useState("");
  const [stageDescriptions, setStageDescriptions] = useState(
    defaultStageDescriptions || ""
  );

  const handleSetTitle = (value: string | ((prev: string) => string)) => {
    const newValue = typeof value == "function" ? value(title) : value;

    setTitle(newValue);
    setTitleError("");
  };

  const validateForm = () => {
    let passing = true;

    setTitle((prev) => prev.trim());
    if (!title) {
      setTitleError("Please name your quest.");
      passing = false;
    }

    if (!realmId) {
      passing = false;
    }

    return passing;
  };

  const resetForm = useCallback(() => {
    setRealmId(defaultRealmId || realms[0]?.id || "");
    setTitle(defaultTitle || "");
    setTitleError("");
    setStageDescriptions(defaultStageDescriptions || "");
  }, [defaultRealmId, defaultTitle, defaultStageDescriptions, realms]);

  return {
    realmId,
    title,
    titleError,
    stageDescriptions,
    setRealmId,
    setTitle: handleSetTitle,
    setStageDescriptions,
    validateForm,
    resetForm,
  };
};

const EditQuestButton = () => {
  const selectedQuest = useQuestStore((state) => state.selectedQuest);
  const editQuest = useQuestStore((state) => state.editQuest);

  const {
    realmOptions,
    realmId,
    title,
    titleError,
    stageDescriptions,
    setRealmId,
    setTitle,
    setStageDescriptions,
    validateForm,
    resetForm,
  } = useQuestForm(
    selectedQuest?.realmId,
    selectedQuest?.title,
    selectedQuest?.stages.map((s) => s.description).join("\n")
  );

  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleButtonClick = () => {
    resetForm();
    dialogRef.current?.showModal();
  };

  const handleClickOutsideDialog = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target == dialogRef.current) {
      dialogRef.current?.close();
    }
  };

  const handleRealmSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedRealmId = event.target.value;

    setRealmId(selectedRealmId);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTitle(value);
  };

  const handleStageDescriptionsChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setStageDescriptions(value);
  };

  const handleCancel = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dialogRef.current?.close();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) return;

    const stages = stageDescriptions
      .trim()
      .split("\n")
      .map((d) => d.trim())
      .filter((d) => d);

    editQuest(realmId, title, stages);
    dialogRef.current?.close();
  };

  return (
    <>
      <button
        className="quest-btn ticket-container-dark"
        onClick={handleButtonClick}
      >
        Edit Quest
      </button>
      <dialog
        className="quest-dialog"
        ref={dialogRef}
        onClick={handleClickOutsideDialog}
      >
        <form
          onSubmit={handleSubmit}
          className="quest-dialog-form ticket-container-dark"
        >
          <h3>Edit Quest</h3>

          <div className="quest-dialog-form-container">
            <div>
              <label htmlFor="realm-select">Realm</label>
              <select
                value={realmId}
                onChange={handleRealmSelect}
                name="realm-select"
              >
                {realmsOptions((realm) => (
                  <option key={realm.id} value={realm.id}>
                    {realm.title}
                  </option>
                ))}
              </select>

              <label htmlFor="new-quest-title">Title</label>
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                name="new-quest-title"
              />
              {titleError}
            </div>
            <div>
              <label htmlFor="stage-descriptions">Stages</label>
              <textarea
                value={stageDescriptions}
                onChange={handleStageDescriptionsChange}
              />
            </div>
          </div>

          <div className="quest-dialog-buttons">
            <button
              type="button"
              onClick={handleCancel}
              className="ticket-container-dark"
            >
              Cancel
            </button>
            <button type="submit" className="ticket-container-dark">
              Confirm
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
};
export default EditQuestButton;
