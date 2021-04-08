import Button from "../Button";
import Panel from "../Panel";
import { playTrack } from "../../util/songs";

import "./style.css";

function Game({ game, onReady, onAnswer, currentUser }) {
    const handleListen = () => {
        playTrack(game.question.musicId);
    };

    const handleAnswer = (answerId) => {
        onAnswer(answerId);
    };
    
    return (
        <div className="game-wrapper">
          <div className="game-players-wrapper">
            <div className="game-players">
              {game.users.map(player => {
                let extra = "null";

                if(game.status === "pending" && !game.readyList[player.id]) {
                  extra = "Waiting";
                }

                if(game.status === "started" && !game.question.readyList[player.id]) {
                  extra = "Waiting";
                }

                if(game.status === "finished") {
                  extra = game.leaderboard.find(({ userId }) => userId === player.id).score + " points";
                }

                return (
                  <div
                    key={player.id}
                    className="game-player"
                    style={{background: player.avatar}}
                    data-extra={extra}>
                    {player.name}
                  </div>
                );
              })}
            </div>
          </div>

            <div className="game-state">
                <div className="game-title">Songhack</div>
                <br/>

                {game.status === "pending" && <>
                    <Panel>
                        The next round will start when everyone is ready.
                    </Panel>
                    <Button disabled={game.readyList[game.userId]} onClick={onReady}>I'm ready</Button>
                </>}

                {game.status === "started" && <>
                    <Panel>
                        Listen to 10 seconds of the song and choose the best answer.
                    </Panel>

                    <Button disabled={game.readyList[game.userId]} onClick={handleListen}>Click to listen</Button>
                    <br/>

                    {!game.question.readyList[currentUser.id] && 
                    <>
                      <Panel>
                        {game.question.text}
                      </Panel>
                      {game.question.answers.map(answer => (
                        <Button onClick={() => handleAnswer(answer.id)}>{answer.text}</Button>
                      ))}
                    </>}
                    
                    {game.question.readyList[currentUser.id] && <Panel>Waiting for others to answer</Panel>}
                </>}

                {game.status === "finished" && <>
                    <Panel>
                        And the winners are:
                    </Panel>
                    
                    <table className="game-leaderboard">
                        <tr>
                            <th>Name</th>
                            <th>Score</th>
                        </tr>
                        
                        {game.leaderboard.map(({ userId, score }) => {
                            const player = game.users.find((user) => user.id === userId);
                            return (
                              <tr>
                                <td className="game-leaderboard-name-value">{player.name}</td>
                                <td className="game-leaderboard-score-value">{score}</td>
                              </tr>
                            );
                        })}
                    </table>
                </>}
            </div>
        </div>
    );
}

export default Game;