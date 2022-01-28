import React from "react";

import RecapIntro from "./RecapIntro";
import "../../App.css";
import "../../index.css";
import "./recap.css";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Game/Recap/Intro",
  component: RecapIntro,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    game: { control: "json" },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <RecapIntro {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  onNextTick: () => {},
};
