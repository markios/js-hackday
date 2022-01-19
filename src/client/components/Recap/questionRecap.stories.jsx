import React from "react";

import Recap from ".";
import "../../App.css";
import "../../index.css";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Game/Recap",
  component: Recap,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    game: { control: "json" },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Recap {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
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
      },
      a2: {
        q1: 2,
      },
      a3: {
        q1: 3,
      },
    },
  },
};
