import { useState, useEffect } from "react";
import Button from "../Button";
import Panel from "../Panel";
import Recap from "../Recap";
import { playTrack, stopTrack } from "../../util/songs";

import "./style.css";

function Game({ game, onReady, onAnswer, currentUser }) {
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [songLoaded, setSongLoaded] = useState(false);

  const handleListen = () => {
    playTrack(game.question.musicId, 10, () => setSongLoaded(true));
  };

  const handleAnswer = (answerId) => {
    onAnswer(answerId);
    setSongLoaded(false);
  };

  useEffect(() => {
    if (game?.question && currentQuestionId !== game.question.id) {
      setCurrentQuestionId(game.question.id);
      stopTrack();
    }
  }, [game, currentQuestionId]);

  return (
    <div className="game-wrapper">
      {game.status === "finished" && <Recap game={game} />}

      <div className="game-players-wrapper">
        <div className="game-players">
          {game.status !== "finished" &&
            game.users.map((player) => {
              let extra = "null";

              if (game.status === "pending" && !game.readyList[player.id]) {
                extra = "Waiting";
              }

              if (
                game.status === "started" &&
                !game.question.readyList[player.id]
              ) {
                extra = "Waiting";
              }

              return (
                <div
                  key={player.id}
                  className="game-player"
                  style={{ background: player.avatar }}
                  data-extra={extra}
                >
                  {player.name}
                </div>
              );
            })}
        </div>
      </div>

      <div className="game-state">
        <div className="game-title">Songhack</div>
        <br />

        {game.status === "pending" && (
          <>
            <Panel>The next round will start when everyone is ready.</Panel>
            <Button disabled={game.readyList[game.userId]} onClick={onReady}>
              I'm ready
            </Button>
          </>
        )}

        {game.status === "started" && (
          <section key={`question-${game.question.number}`} className="fade-in">
            <h3>{`Question ${game.question.number}`}</h3>
            <Panel>
              Listen to 10 seconds of the song and choose the best answer.
            </Panel>

            <Button
              disabled={game.readyList[game.userId]}
              onClick={handleListen}
            >
              Click to listen
            </Button>
            <br />

            {songLoaded && !game.question.readyList[currentUser.id] && (
              <div className="fade-in">
                <Panel>{game.question.text}</Panel>
                {game.question.answers.map((answer) => (
                  <Button onClick={() => handleAnswer(answer.id)}>
                    {answer.text}
                  </Button>
                ))}
              </div>
            )}

            {game.question.readyList[currentUser.id] && (
              <Panel>Waiting for others to answer</Panel>
            )}
          </section>
        )}
      </div>
    </div>
  );
}

export default Game;
