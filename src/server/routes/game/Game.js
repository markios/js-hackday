import data from '../../data/game.json';

const STATUS = {
  PENDING: 'pending',
  STARTED: 'started',
  FINISHED: 'finished',
};

const userAnswerTemplate = data.questions.reduce((result, question) => {
  return {
    ...result,
    [question.id]: null
  };
}, {});

class Game {
  constructor(id) {
    this.state = {
      id,
      status: STATUS.PENDING,
      users: [],
      readyList: {},
      currentQuestion: null,
      userVotes: {},
      ...data,
      questionState: data.questions.reduce((result, question) => {
        return {
          ...result,
          [question.id]: {
            ...question,
            readyList: {}
          }
        };
      }, {}),
    }
  }

  static allReady(item) {
    return Object.values(item.readyList).every(r => r);
  }

  progressGame() {
    const { status, currentQuestion } = this.state;
    const target = (status === STATUS.PENDING) ? this.state : this.state.questionState[currentQuestion];

    const everyoneAnswered = Game.allReady(target);
    if (everyoneAnswered) {
      this.nextQuestion();
    }
  }

  getUsers() {
    return this.state.users;
  }

  addUser(user) {
    this.state.users.push(user);
    this.state.readyList[user.id] = false;
    Object.keys(this.state.questionState).forEach((id) => {
      this.state.questionState[id].readyList[user.id] = false;
    });
    if (!this.state.userVotes[user.id]) {
      this.state.userVotes[user.id] = {
        ...userAnswerTemplate
      };
    }
  }

  addReady(userId) {
    this.state.readyList[userId] = true;
    this.progressGame();
  }

  addVote(userId, answerId) {
    const current = this.state.currentQuestion;
    this.state.questionState[current].readyList[userId] = true;
    this.state.userVotes[userId][current] = answerId;
    this.progressGame();
  }

  startGame() {
    const { questions } = this.state;
    this.state = {
      ...this.state,
      currentQuestion: questions[0],
      status: STATUS.STARTED
    };
  }

  nextQuestion() {
    // get next question
    const { status, questions, currentQuestion } = this.state;

    let nextIndex = 0;
    if (status === STATUS.STARTED) {
      nextIndex = questions.findIndex(q => q.id === currentQuestion) + 1;
    }
    const nextQuestion = questions[nextIndex];
    
    if (nextQuestion) {
      this.state = {
        ...this.state,
        status: STATUS.STARTED,
        currentQuestion: nextQuestion.id
      };
    } else {
      this.finishGame();
    }
  }

  finishGame() {
    const { userVotes, questions } = this.state;
    const scores = {};
    questions.forEach(({ correctAnswer, id }) => {
      Object.keys(userVotes).forEach((userId) => {
        if (scores[userId] === undefined) {
          scores[userId] = 0;
        }
        scores[userId] += userVotes[userId][id] === correctAnswer ? 100 : 0;
      });
    });
    
    const leaderboard = Object.entries(scores).reduce((o, [userId, score]) => {
      o.push({ userId, score });
      return o;
    }, []);

    this.state = {
      ...this.state,
      status: STATUS.FINISHED,
      leaderboard: leaderboard.sort((a, b) => b.score - a.score)
    }
  }

  getStateSnapshot() {
    const {
      id,
      title,
      status,
      readyList,
      users,
      questionState,
      currentQuestion,
      leaderboard
    } = this.state;

    const defaultState = {
      id,
      title,
      status,
      readyList,
      users
    };

    if (status === STATUS.PENDING) {
      return {
        ...defaultState
      }
    }

    if (status === STATUS.STARTED) {
      return {
        ...defaultState,
        question: questionState[currentQuestion]
      }
    }

    if (status === STATUS.FINISHED) {
      return {
        ...defaultState,
        leaderboard
      }
    }
  }

};

export default Game;