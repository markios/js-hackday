import { useState } from "react";
import RecapIntro from "./RecapIntro";
import RecapQuestion from "./RecapQuestion";
import RecapLeaderboard from "./RecapLeaderboard";
import "./recap.css";

const Recap = ({ game }) => {
  const [currentQuestionIndex, setQuestionIndex] = useState(0);
  const incrementItem = () =>
    setTimeout(() => setQuestionIndex(currentQuestionIndex + 1), 2000);

  const isEnd = currentQuestionIndex > game.questions.length;

  return (
    <div className="recap">
      {currentQuestionIndex === 0 && <RecapIntro onNextTick={incrementItem} />}
      {!isEnd && currentQuestionIndex > 0 && (
        <RecapQuestion
          game={game}
          onNextTick={incrementItem}
          currentQuestionIndex={currentQuestionIndex}
        />
      )}
      {isEnd && <RecapLeaderboard game={game} />}
    </div>
  );
};

export default Recap;
