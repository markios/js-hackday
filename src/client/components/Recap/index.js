import { useState } from "react";
import RecapIntro from "./RecapIntro";
import RecapQuestion from "./RecapQuestion";
import RecapLeaderboard from "./RecapLeaderboard";
import AudioManager, { AudioManager as AM } from "../../util/AudioManager";
import "./recap.css";

const Recap = ({ game, currentUser }) => {
  const [currentQuestionIndex, setQuestionIndex] = useState(0);
  const incrementItem = () =>
    setTimeout(() => setQuestionIndex(currentQuestionIndex + 1), 2000);

  const isEnd = currentQuestionIndex > game.questions.length;

  const onAnswersShown = () => {
    const currentQuestion = game.questions[currentQuestionIndex - 1];
    if (
      currentQuestion.correctAnswer ===
      game.userVotes[currentUser.id][currentQuestion.id]
    ) {
      AudioManager.playSound(AM.sounds.CORRECT);
    } else {
      AudioManager.playSound(AM.sounds.INCORRECT);
    }
  };

  const onLeaderShown = () => {
    AudioManager.playSound(AM.sounds.COMPLETE);
  };

  return (
    <div className="recap">
      {currentQuestionIndex === 0 && <RecapIntro onNextTick={incrementItem} />}
      {!isEnd && currentQuestionIndex > 0 && (
        <RecapQuestion
          game={game}
          onNextTick={incrementItem}
          onAnswersShown={onAnswersShown}
          currentUser={currentUser}
          currentQuestionIndex={currentQuestionIndex}
        />
      )}
      {isEnd && <RecapLeaderboard game={game} onLeaderShown={onLeaderShown} />}
    </div>
  );
};

export default Recap;
