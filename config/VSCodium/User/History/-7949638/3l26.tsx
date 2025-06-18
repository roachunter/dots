import type { Quest } from "../../model/quest";
import type { Realm } from "../../model/realm";
import useQuestStore from "../state/questStore";
import QuestDropdown from "./QuestDropdown";
import "./styles/QuestDropdowns.css";

const QuestDropdowns = () => {
  const realms = useQuestStore((state) => state.realms);

  return (
    <div className="quest-dropdowns-container">
      {realms.map((realm, index) => (
        <QuestDropdown
          key={`${realm.title}-${index}`} // TODO: add id to realms
          realm={realm}
        />
      ))}
    </div>
  );
};
export default QuestDropdowns;
