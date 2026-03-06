import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "outline"],
      description: "Button variant",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Button size",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    children: {
      control: "text",
      description: "Button content",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Primary variants - Dark mode
export const PrimarySmallDark: Story = {
  args: {
    children: "Button CTA",
    variant: "primary",
    size: "small",
  },
};

export const PrimaryMediumDark: Story = {
  args: {
    children: "Button CTA",
    variant: "primary",
    size: "medium",
  },
};

export const PrimaryLargeDark: Story = {
  args: {
    children: "Button CTA",
    variant: "primary",
    size: "large",
  },
};

// Outline variants - Dark mode
export const OutlineSmallDark: Story = {
  args: {
    children: "Button CTA",
    variant: "outline",
    size: "small",
  },
};

export const OutlineMediumDark: Story = {
  args: {
    children: "Button CTA",
    variant: "outline",
    size: "medium",
  },
};

export const OutlineLargeDark: Story = {
  args: {
    children: "Button CTA",
    variant: "outline",
    size: "large",
  },
};

// All variants grid - Dark mode
export const AllVariantsDark: Story = {
  args: {
    children: "Button CTA",
  },
  decorators: [
    () => (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <p className="text-[var(--text-secondary)] text-[14px]">Primary</p>
          <div className="flex items-center gap-4">
            <Button variant="primary" size="small">Button CTA</Button>
            <Button variant="primary" size="medium">Button CTA</Button>
            <Button variant="primary" size="large">Button CTA</Button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-[var(--text-secondary)] text-[14px]">Outline</p>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="small">Button CTA</Button>
            <Button variant="outline" size="medium">Button CTA</Button>
            <Button variant="outline" size="large">Button CTA</Button>
          </div>
        </div>
      </div>
    ),
  ],
};

// Primary variants - Light mode
export const PrimarySmallLight: Story = {
  args: {
    children: "Button CTA",
    variant: "primary",
    size: "small",
  },
};

export const PrimaryMediumLight: Story = {
  args: {
    children: "Button CTA",
    variant: "primary",
    size: "medium",
  },
};

export const PrimaryLargeLight: Story = {
  args: {
    children: "Button CTA",
    variant: "primary",
    size: "large",
  },
};

// Outline variants - Light mode
export const OutlineSmallLight: Story = {
  args: {
    children: "Button CTA",
    variant: "outline",
    size: "small",
  },
};

export const OutlineMediumLight: Story = {
  args: {
    children: "Button CTA",
    variant: "outline",
    size: "medium",
  },
};

export const OutlineLargeLight: Story = {
  args: {
    children: "Button CTA",
    variant: "outline",
    size: "large",
  },
};

// All variants grid - Light mode
export const AllVariantsLight: Story = {
  args: {
    children: "Button CTA",
  },
  decorators: [
    () => (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <p className="text-[var(--text-secondary)] text-[14px]">Primary</p>
          <div className="flex items-center gap-4">
            <Button variant="primary" size="small">Button CTA</Button>
            <Button variant="primary" size="medium">Button CTA</Button>
            <Button variant="primary" size="large">Button CTA</Button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-[var(--text-secondary)] text-[14px]">Outline</p>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="small">Button CTA</Button>
            <Button variant="outline" size="medium">Button CTA</Button>
            <Button variant="outline" size="large">Button CTA</Button>
          </div>
        </div>
      </div>
    ),
  ],
};
