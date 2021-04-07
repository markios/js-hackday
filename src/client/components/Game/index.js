import Button from "../Button";
import Panel from "../Panel";
import { playTrack } from "../../util/songs";

import "./style.css";

function Game({ game, onReady, onAnswer }) {
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
                            extra = game.leaderboard[player.id] + " points";
                        }

                        return (
                            <div key={player.id}
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

                    <Panel>
                        {game.question.text}
                    </Panel>

                    {game.question.answers.map(answer => (
                        <Button onClick={() => handleAnswer(answer.id)}>{answer.text}</Button>
                    ))}
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
                        
                        {(() => {
                            // const longestNameLength = game.users.reduce((longest, user) => {
                            //     return user.name.length < longest ? longest : user.name.length;
                            // }, 0);

                            return game.users.map(player => (
                                <tr>
                                    <td className="game-leaderboard-name-value">{player.name}</td>
                                    <td className="game-leaderboard-score-value">{game.leaderboard[player.id]}</td>
                                </tr>
                            ));
                        })()}
                    </table>
                </>}
            </div>
        </div>
    );
}

export default Game;