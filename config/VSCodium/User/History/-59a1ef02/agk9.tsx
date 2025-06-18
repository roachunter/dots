import type { Quest } from "../model/quest";
import type { Realm } from "../model/realm";
import QuestDropdownItem from "./QuestDropdownItem";
import "./styles/QuestDropdown.css";

type Props = {
  realms: Realm[];
  selectedQuest: Quest | null;
  onQuestClick: (realm: Realm, quest: Quest) => void;
};

const QuestDropdown = ({ realms, selectedQuest, onQuestClick }: Props) => {
  return realms.map(
    (
      realm,
      index // TODO: add id to realms
    ) => (
      <div key={`${realm.title}-${index}`} className="dropdown-container">
        <details>
          <summary className="ticket-container-dark">{realm.title}</summary>
          <div className="dropdown-content">
            {realm.quests.map((quest) => {
              return (
                <QuestDropdownItem
                  key={`${quest.title}-${selectedQuest == quest}`} // TODO: add id to quests
                  quest={quest}
                  realmTitle={realm.title}
                  selected={selectedQuest == quest}
                  onClick={(quest) => {
                    onQuestClick(realm, quest);
                  }}
                />
              );
            })}
          </div>
        </details>
      </div>
    )
  );
};
export default QuestDropdown;
