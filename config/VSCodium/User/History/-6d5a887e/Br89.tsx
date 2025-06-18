import { useState, type ChangeEvent, type FormEvent } from "react";
import useQuestStore from "../state/questStore";
import "./styles/QuestDescription.css";

const QuestDescription = () => {
  const selectedQuest = useQuestStore((state) => state.selectedQuest);
  const questDescription = selectedQuest?.description;

  const [description, setDescription] = useState("");
  const [editing, setEditing] = useState(false);

  const handleDescClick = () => {
    setDescription(questDescription || "");
    setEditing(true);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setDescription(value);
  };

  const handleCancelEdit = () => {
    setEditing(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    
  }

  return (
    <>
      <div className="quest-description-container">
        {selectedQuest &&
          (!editing ? (
            <div onClick={handleDescClick}>
              {questDescription ? (
                questDescription?.split("\n").map((paragraph, index) => (
                  <p key={index} className="quest-description">
                    {paragraph}
                  </p>
                ))
              ) : (
                <>Click to add description</>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="quest-description-form">
              <textarea
                value={description}
                onChange={handleDescriptionChange}
                autoFocus
              />

              <div className="quest-description-form-buttons">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="ticket-container-dark"
                >
                  Cancel
                </button>
                <button type="submit" className="ticket-container-dark">
                  Save
                </button>
              </div>
            </form>
          ))}
      </div>
    </>
  );
};
export default QuestDescription;
