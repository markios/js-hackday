import React from "react";

import RecapQuestion from "./RecapQuestion";
import "../../App.css";
import "../../index.css";
import "./recap.css";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Game/Recap/RecapQuestion",
  component: RecapQuestion,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    game: { control: "json" },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <RecapQuestion {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  currentQuestionIndex: 1,
  game: {
    questions: [
      {
        id: "q1",
        text: "This is question 1?",
        correctAnswer: 1,
        answers: [
          { text: "Answer 1", id: 1 },
          { text: "Answer 2", id: 2 },
          { text: "Answer 3", id: 3 },
          { text: "Answer 4", id: 4 },
        ],
      },
    ],
    users: [
      {
        id: "a1",
        name: "player 1",
        avatar: "#345C3C",
      },
      {
        id: "a2",
        name: "player 2",
        avatar: "#FF5733",
      },
      {
        id: "a3",
        name: "player 3",
        avatar: "#DAF7A6",
      },
    ],
    userVotes: {
      a1: {
        q1: 1,
        q2: 2,
      },
      a2: {
        q1: 2,
        q2: 3,
      },
      a3: {
        q1: 3,
        q2: 2,
      },
    },
  },
};
