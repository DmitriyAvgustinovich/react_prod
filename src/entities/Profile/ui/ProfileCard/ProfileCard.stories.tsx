import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Country } from "entities/Country";
import { Currency } from "entities/Currency";
import { ProfileCard } from "./ProfileCard";

export default {
  title: "entities/ProfileCard",
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => (
  <ProfileCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  data: {
    username: "admin",
    age: 22,
    country: Country.Russia,
    lastname: "adv",
    first: "asd",
    city: "asf",
    currency: Currency.USD,
    avatar: "https://pic.rutubelist.ru/user/3b/27/3b2758ad5492a76b578f7ee072e4e894.jpg",
  },
};

export const WithError = Template.bind({});
WithError.args = {
  error: "error",
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
