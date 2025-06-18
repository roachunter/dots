import { useState } from "react";
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

  return (
    <>
      {questDescription ? (
        <div onClick={handleDescClick} className="quest-description-container">
          {questDescription.split("\n").map((paragraph, index) => (
            <p key={index} className="quest-description">
              {paragraph}
            </p>
          ))}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default QuestDescription;
