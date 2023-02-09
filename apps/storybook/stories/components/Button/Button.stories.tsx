import React from "react";
import LanguageButton from "@components/Button/LanguageButton";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/Button",
  component: LanguageButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <LanguageButton {...args} />;

export const test = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
test.args = {
  primary: true,
  label: "LanguageButton",
};
