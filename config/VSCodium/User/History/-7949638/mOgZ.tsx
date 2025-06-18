import useQuestStore from "../state/questStore";
import QuestDropdown from "./QuestDropdown";
import "./styles/QuestDropdowns.css";

const QuestDropdowns = () => {
  const realms = useQuestStore((state) => state.realms);

  return (
    <>
      <button className="ticket-container-dark" popoverTarget="add-realm-popover">
        Button
      </button>
      <div id="add-realm-popover" popover="">
        bebra
      </div>
      <div className="quest-dropdowns-container">
        {realms.map((realm) => (
          <QuestDropdown key={realm.id} realm={realm} />
        ))}
      </div>
    </>
  );
};
export default QuestDropdowns;
