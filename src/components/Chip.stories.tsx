import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Chip } from "./Chip";

const meta: Meta<typeof Chip> = {
  title: "Components/Chip",
  component: Chip,
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "select",
      options: ["white", "success", "error"],
      description: "Color variant",
    },
    size: {
      control: "select",
      options: ["sm", "md"],
      description: "Size variant",
    },
    children: {
      control: "text",
      description: "Chip label",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Small size variants - Dark mode
export const WhiteSmallDark: Story = {
  args: {
    children: "Label",
    color: "white",
    size: "sm",
  },
};

export const SuccessSmallDark: Story = {
  args: {
    children: "Label",
    color: "success",
    size: "sm",
  },
};

export const ErrorSmallDark: Story = {
  args: {
    children: "Label",
    color: "error",
    size: "sm",
  },
};

// Medium size variants - Dark mode
export const WhiteMediumDark: Story = {
  args: {
    children: "Label",
    color: "white",
    size: "md",
  },
};

export const SuccessMediumDark: Story = {
  args: {
    children: "Label",
    color: "success",
    size: "md",
  },
};

export const ErrorMediumDark: Story = {
  args: {
    children: "Label",
    color: "error",
    size: "md",
  },
};

// All variants grid - Dark mode
export const AllVariantsDark: Story = {
  args: {
    children: "Label",
  },
  decorators: [
    () => (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-[var(--text-secondary)] text-[12px]">Small</p>
          <div className="flex items-center gap-4">
            <Chip color="white" size="sm">Label</Chip>
            <Chip color="success" size="sm">Label</Chip>
            <Chip color="error" size="sm">Label</Chip>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[var(--text-secondary)] text-[12px]">Medium</p>
          <div className="flex items-center gap-4">
            <Chip color="white" size="md">Label</Chip>
            <Chip color="success" size="md">Label</Chip>
            <Chip color="error" size="md">Label</Chip>
          </div>
        </div>
      </div>
    ),
  ],
};

// Small size variants - Light mode
export const WhiteSmallLight: Story = {
  args: {
    children: "Label",
    color: "white",
    size: "sm",
  },
};

export const SuccessSmallLight: Story = {
  args: {
    children: "Label",
    color: "success",
    size: "sm",
  },
};

export const ErrorSmallLight: Story = {
  args: {
    children: "Label",
    color: "error",
    size: "sm",
  },
};

// Medium size variants - Light mode
export const WhiteMediumLight: Story = {
  args: {
    children: "Label",
    color: "white",
    size: "md",
  },
};

export const SuccessMediumLight: Story = {
  args: {
    children: "Label",
    color: "success",
    size: "md",
  },
};

export const ErrorMediumLight: Story = {
  args: {
    children: "Label",
    color: "error",
    size: "md",
  },
};

// All variants grid - Light mode
export const AllVariantsLight: Story = {
  args: {
    children: "Label",
  },
  decorators: [
    () => (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-[var(--text-secondary)] text-[12px]">Small</p>
          <div className="flex items-center gap-4">
            <Chip color="white" size="sm">Label</Chip>
            <Chip color="success" size="sm">Label</Chip>
            <Chip color="error" size="sm">Label</Chip>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[var(--text-secondary)] text-[12px]">Medium</p>
          <div className="flex items-center gap-4">
            <Chip color="white" size="md">Label</Chip>
            <Chip color="success" size="md">Label</Chip>
            <Chip color="error" size="md">Label</Chip>
          </div>
        </div>
      </div>
    ),
  ],
};
