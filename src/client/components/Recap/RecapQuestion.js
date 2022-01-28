const NUMBERS = ["one", "two", "three", "four", "five"];

const RecapQuestion = ({
  game,
  onNextTick = () => {},
  currentQuestionIndex,
}) => {
  const currentQuestion = game.questions[currentQuestionIndex - 1];
  const correctAnswerId = currentQuestion.correctAnswer;
  const mappedUsers = game.users.map((user) => ({
    ...user,
    correct: game.userVotes[user.id][currentQuestion.id] === correctAnswerId,
  }));

  return (
    <div className="recap__question">
      <h2 className="align-center">Question {currentQuestionIndex}</h2>
      <p className="recap__question__question">
        <strong>{currentQuestion.text}</strong>
      </p>
      <div className="recap__answers">
        {currentQuestion.answers.map(({ text, id }, index) => (
          <div
            className={`recap__answer recap__answer--${NUMBERS[index]} ${
              id === correctAnswerId ? "recap__answer--correct" : ""
            }`}
            key={`a__${id}__${currentQuestionIndex}`}
          >
            {text}
          </div>
        ))}
      </div>
      <div className="recap__users">
        {mappedUsers.map((user) => (
          <div
            key={`${currentQuestionIndex}_${user.id}`}
            onAnimationEnd={onNextTick}
            style={{ backgroundColor: user.avatar }}
            className={`recap__user ${
              !user.correct ? "recap__user--incorrect" : ""
            }`}
          >
            {user.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecapQuestion;
