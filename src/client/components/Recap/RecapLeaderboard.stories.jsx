import React from "react";

import RecapLeaderboard from "./RecapLeaderboard";
import "../../App.css";
import "../../index.css";
import "./recap.css";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Game/Recap/Leaderboard",
  component: RecapLeaderboard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    game: { control: "json" },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <RecapLeaderboard {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  game: {
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
    leaderboard: [
      {
        userId: "a1",
        score: 100,
      },
      {
        userId: "a2",
        score: 90,
      },
      {
        userId: "a3",
        score: 20,
      },
    ],
  },
};
