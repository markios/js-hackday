const RecapIntro = ({ onNextTick }) => {
  return (
    <div onAnimationEnd={onNextTick} className="recap__intro">
      <h2 className="xxl">Game Over</h2>
    </div>
  );
};

export default RecapIntro;
