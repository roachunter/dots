import type { Quest } from "../../model/quest";
import type { Realm } from "../../model/realm";
import QuestDescription from "../components/QuestDescription";
import QuestDropdowns from "../components/QuestDropdowns";
import QuestStages from "../components/QuestStages";
import useQuestStore from "../state/questStore";
import "./styles/QuestsPane.css";

// const realms: Realm[] = Array(3)
//   .fill(null)
//   .map((_, index) => ({
//     title: `Realm #${index + 1}`,
//     quests: Array(3)
//       .fill(null)
//       .map((_, index) => ({
//         title: `Quest #${index + 1}`,
//         description:
//           "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis, rem ad? Perferendis culpa assumenda ipsam et quasi? Nesciunt explicabo temporibus cumque iusto repellat quaerat aspernatur eligendi! Animi, aut odit? Deserunt quae corrupti perferendis aspernatur sint atque mollitia distinctio magnam, beatae vero in, incidunt at ipsam quaerat iure dolorem aliquid nesciunt quasi doloribus? Pariatur numquam voluptas suscipit facere voluptate fugiat accusamus.\nLorem ipsum dolor sit, amet consectetur adipisicing elit. Quod nostrum vel facere pariatur facilis itaque voluptatibus fuga tempore voluptate. Ex eveniet nesciunt veritatis nisi doloremque similique consequatur maxime voluptatum, molestias doloribus velit ducimus blanditiis deleniti placeat temporibus. A, quos nisi! Odio aperiam, deleniti sapiente earum tenetur ad eius necessitatibus cum! Odio eligendi molestiae perspiciatis excepturi magni, distinctio incidunt. Sint consequatur, deleniti nihil cum laborum atque ipsa pariatur minima tenetur dicta quos nemo, eligendi expedita. Expedita culpa quidem nesciunt inventore cupiditate.\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis, rem ad? Perferendis culpa assumenda ipsam et quasi? Nesciunt explicabo temporibus cumque iusto repellat quaerat aspernatur eligendi! Animi, aut odit? Deserunt quae corrupti perferendis aspernatur sint atque mollitia distinctio magnam, beatae vero in, incidunt at ipsam quaerat iure dolorem aliquid nesciunt quasi doloribus? Pariatur numquam voluptas suscipit facere voluptate fugiat accusamus.\nLorem ipsum dolor sit, amet consectetur adipisicing elit. Quod nostrum vel facere pariatur facilis itaque voluptatibus fuga tempore voluptate. Ex eveniet nesciunt veritatis nisi doloremque similique consequatur maxime voluptatum, molestias doloribus velit ducimus blanditiis deleniti placeat temporibus. A, quos nisi! Odio aperiam, deleniti sapiente earum tenetur ad eius necessitatibus cum! Odio eligendi molestiae perspiciatis excepturi magni, distinctio incidunt. Sint consequatur, deleniti nihil cum laborum atque ipsa pariatur minima tenetur dicta quos nemo, eligendi expedita. Expedita culpa quidem nesciunt inventore cupiditate.",
//         stages: [
//           {
//             description:
//               "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi.",
//             state: "current",
//           },
//           {
//             description:
//               "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis, quaerat.",
//             state: "prepared",
//           },
//           { description: "Lorem ipsum dolor sit amet.", state: "prepared" },
//           {
//             description:
//               "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//             state: "completed",
//           },
//         ],
//       })),
//   }));

// // const quests: Quest[] = Array(9)
// //   .fill(null)
// //   .map((_, index) => ({
// //     title: `Quest #${index + 1}`,
// //     description:
// //       "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis, rem ad? Perferendis culpa assumenda ipsam et quasi? Nesciunt explicabo temporibus cumque iusto repellat quaerat aspernatur eligendi! Animi, aut odit? Deserunt quae corrupti perferendis aspernatur sint atque mollitia distinctio magnam, beatae vero in, incidunt at ipsam quaerat iure dolorem aliquid nesciunt quasi doloribus? Pariatur numquam voluptas suscipit facere voluptate fugiat accusamus.\nLorem ipsum dolor sit, amet consectetur adipisicing elit. Quod nostrum vel facere pariatur facilis itaque voluptatibus fuga tempore voluptate. Ex eveniet nesciunt veritatis nisi doloremque similique consequatur maxime voluptatum, molestias doloribus velit ducimus blanditiis deleniti placeat temporibus. A, quos nisi! Odio aperiam, deleniti sapiente earum tenetur ad eius necessitatibus cum! Odio eligendi molestiae perspiciatis excepturi magni, distinctio incidunt. Sint consequatur, deleniti nihil cum laborum atque ipsa pariatur minima tenetur dicta quos nemo, eligendi expedita. Expedita culpa quidem nesciunt inventore cupiditate.\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis, rem ad? Perferendis culpa assumenda ipsam et quasi? Nesciunt explicabo temporibus cumque iusto repellat quaerat aspernatur eligendi! Animi, aut odit? Deserunt quae corrupti perferendis aspernatur sint atque mollitia distinctio magnam, beatae vero in, incidunt at ipsam quaerat iure dolorem aliquid nesciunt quasi doloribus? Pariatur numquam voluptas suscipit facere voluptate fugiat accusamus.\nLorem ipsum dolor sit, amet consectetur adipisicing elit. Quod nostrum vel facere pariatur facilis itaque voluptatibus fuga tempore voluptate. Ex eveniet nesciunt veritatis nisi doloremque similique consequatur maxime voluptatum, molestias doloribus velit ducimus blanditiis deleniti placeat temporibus. A, quos nisi! Odio aperiam, deleniti sapiente earum tenetur ad eius necessitatibus cum! Odio eligendi molestiae perspiciatis excepturi magni, distinctio incidunt. Sint consequatur, deleniti nihil cum laborum atque ipsa pariatur minima tenetur dicta quos nemo, eligendi expedita. Expedita culpa quidem nesciunt inventore cupiditate.",
// //     stages: [
// //       {
// //         description:
// //           "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi.",
// //         state: "current",
// //       },
// //       {
// //         description:
// //           "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis, quaerat.",
// //         state: "prepared",
// //       },
// //       { description: "Lorem ipsum dolor sit amet.", state: "prepared" },
// //       {
// //         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
// //         state: "completed",
// //       },
// //     ],
// //   }));

const QuestsPane = () => {
  const { realms, selectedRealm, selectedQuest, selectRealm, selectQuest } =
    useQuestStore();

  const handleQuestClick = (realm: Realm, quest: Quest) => {
    selectRealm(realm);
    selectQuest(quest);
  };

  return (
    <div className="quest-pane">
      <section className="ticket-border-gradient">
        <QuestDropdowns
          realms={realms}
          selectedQuest={selectedQuest}
          onQuestClick={(realm, quest) => handleQuestClick(realm, quest)}
        />
      </section>
      <section className="ticket-border-gradient">
        {selectedQuest && selectedRealm && (
          <QuestStages quest={selectedQuest} realmTitle={selectedRealm.title} />
        )}
      </section>
      <section className="ticket-border-gradient">
        <QuestDescription quest={selectedQuest} />
      </section>
    </div>
  );
};
export default QuestsPane;
