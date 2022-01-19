import { useState } from "react";
import "./recap.css";

const NUMBERS = ["one", "two", "three", "four", "five"];

const RecapQuestion = ({ game }) => {
  const [currentQuestionIndex] = useState(0);

  const currentQuestion = game.questions[currentQuestionIndex];
  const correctAnswerId = currentQuestion.correctAnswer;
  const correctUsers = game.users.filter(
    (user) => game.userVotes[user.id][currentQuestion.id] === correctAnswerId
  );

  return (
    <div className="recap">
      <h2>Question {currentQuestionIndex + 1}</h2>
      <p className="recap__question">
        <strong>{currentQuestion.text}</strong>
      </p>
      <div className="recap__answers">
        {currentQuestion.answers.map(({ text, id }, index) => (
          <div
            className={`recap__answer recap__answer--${NUMBERS[index]} ${
              id === correctAnswerId ? "recap__answer--correct" : ""
            }`}
            key={`a__${id}`}
          >
            {text}
          </div>
        ))}
      </div>
      <div className="recap__users">
        {correctUsers.map((user) => (
          <div style={{ backgroundColor: user.avatar }} className="recap__user">
            {user.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecapQuestion;
