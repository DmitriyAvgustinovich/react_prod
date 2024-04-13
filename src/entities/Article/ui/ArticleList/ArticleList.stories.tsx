import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ArticleView } from "../../model/consts/articleConsts";
import { ArticleList } from "./ArticleList";

export default {
  title: "entities/ArticleList",
  component: ArticleList,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ArticleList>;

const Template: ComponentStory<typeof ArticleList> = (args) => (
  <ArticleList {...args} />
);

export const isLoadingBig = Template.bind({});
isLoadingBig.args = {
  isLoading: true,
  view: ArticleView.BIG,
  articles: [],
};
