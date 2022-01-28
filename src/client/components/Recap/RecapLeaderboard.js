import getUserById from "../../selectors/getUserById";
import mapRevealDelay from "../../util/revealDelay";

const RecapLeaderboard = ({ game }) => {
  const { leaderboard, users } = game;

  const mappedLeaderboard = mapRevealDelay(
    leaderboard.map((item) => ({
      ...item,
      user: getUserById(item.userId, users),
    }))
  );

  return (
    <div className="recap__leaderboard">
      <h2 className="xxl align-center">Leaderboard</h2>
      <ol>
        {mappedLeaderboard.map((item) => (
          <li
            className="recap__leaderboard__listitem"
            style={{
              border: `2px solid ${item.user.avatar}`,
              animationDelay: `${item.delay}s`,
            }}
          >
            <div className="recap__leaderboard__item">
              <span className="recap__leaderboard__item__name">
                {item.user.name}
              </span>
              <span className="recap__leaderboard__item__score">
                {item.score}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default RecapLeaderboard;
