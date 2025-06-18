import { useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import useQuestStore from "../state/questStore";
import "./styles/QuestDescription.css";

const QuestDescription = () => {
  const selectedQuest = useQuestStore((state) => state.selectedQuest);
  const questDescription = selectedQuest?.description;

  const [description, setDescription] = useState("");
  const [editing, setEditing] = useState(false);
  const textarea = useRef<HTMLTextAreaElement>(null);

  const handleDescClick = () => {
    setDescription(questDescription || "");
    setEditing(true);
  };

  const handleTextareaBlur = () => {
    setEditing(false);
  };

  const handleTextareaEscapePress = (
    event: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key == "Escape") {
      handleTextareaBlur();
    }
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setDescription(value);
  };

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
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              autoFocus
              onBlur={handleTextareaBlur}
              onKeyDown={handleTextareaEscapePress}
            />
          ))}
      </div>
    </>
  );
};
export default QuestDescription;
