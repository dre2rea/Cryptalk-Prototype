import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MetricItem } from "./MetricItem";

const meta: Meta<typeof MetricItem> = {
  title: "Components/MetricItem",
  component: MetricItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    trend: {
      control: "select",
      options: ["up", "down"],
      description: "Trend direction - determines color and icon",
    },
    label: {
      control: "text",
      description: "Label displayed at the top",
    },
    value: {
      control: "text",
      description: "Main value displayed",
    },
    changePercent: {
      control: "number",
      description: "Percentage change value",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Dark mode stories
export const DarkDown: Story = {
  args: {
    label: "환율",
    value: "1,394.12원",
    changePercent: 2.46,
    trend: "down",
  },
  parameters: {
    backgrounds: { default: "dark", values: [{ name: "dark", value: "#0c0e12" }] },
  },
  decorators: [
    (Story) => (
      <div data-theme="dark">
        <Story />
      </div>
    ),
  ],
};

export const DarkUp: Story = {
  args: {
    label: "환율",
    value: "1,394.12원",
    changePercent: 102,
    trend: "up",
  },
  parameters: {
    backgrounds: { default: "dark", values: [{ name: "dark", value: "#0c0e12" }] },
  },
  decorators: [
    (Story) => (
      <div data-theme="dark">
        <Story />
      </div>
    ),
  ],
};

// Light mode stories
export const LightDown: Story = {
  args: {
    label: "환율",
    value: "1,394.12원",
    changePercent: 2.46,
    trend: "down",
  },
  parameters: {
    backgrounds: { default: "light", values: [{ name: "light", value: "#fafafa" }] },
  },
  decorators: [
    (Story) => (
      <div data-theme="light">
        <Story />
      </div>
    ),
  ],
};

export const LightUp: Story = {
  args: {
    label: "환율",
    value: "1,394.12원",
    changePercent: 40.5,
    trend: "up",
  },
  parameters: {
    backgrounds: { default: "light", values: [{ name: "light", value: "#fafafa" }] },
  },
  decorators: [
    (Story) => (
      <div data-theme="light">
        <Story />
      </div>
    ),
  ],
};
