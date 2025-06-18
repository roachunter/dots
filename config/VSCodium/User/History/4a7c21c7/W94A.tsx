import useQuestStore from "../state/questStore";

const PreviousStageButton = () => {
  const previousStage = useQuestStore

  return (
    <button onClick={previousStage} className="quest-btn ticket-container-dark">
      Previous Stage
    </button>
  );
};
export default PreviousStageButton;
