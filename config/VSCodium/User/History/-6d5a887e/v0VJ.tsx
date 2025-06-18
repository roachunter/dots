import { useRef, useState } from "react";
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

  return (
    <>
    <div
            onClick={handleDescClick}
            className="quest-description-container"
          >
      {selectedQuest &&
        (!editing ? (
          
            {questDescription ? (
              questDescription?.split("\n").map((paragraph, index) => (
                <p key={index} className="quest-description">
                  {paragraph}
                </p>
              ))
            ) : (
              <>Click to add description</>
            )}
        ) : (
          <textarea autoFocus onBlur={handleTextareaBlur} />
        ))}
          </div>
    </>
  );
};
export default QuestDescription;
