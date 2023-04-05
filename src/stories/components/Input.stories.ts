import type { Meta, StoryObj } from '@storybook/react';

import { Input } from '@/components/input';

const subtitle = 'A simple input component that use all properties from html input tag.'
const description = `Now we have only 1 dark background color marked as "default".
  Input background color is transparent, so background may be different if parent color is not default.
  It\'s also true for the color property.`

const meta  = {
  title: 'Coinapp/Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: subtitle,
    docs: {
      autodocs: true,
      controls: { exclude: ['style'] },
      title: 'Input',
      description: {
        component: description
      }
    },
  },
  argTypes: {
    placeholder: {
      type: { name: 'string', required: false },
      table: {
        type: { summary: 'string' },
      },
      description: 'Placeholder text. Don\'t have a default value'
    },
    className: {
      type: { name: 'string', required: false },
      table: {
        type: { summary: 'string' },
      },
      description: 'You can add another class'
    },
    required: {
      type: { name: 'boolean', required: false },
      table: {
        type: { summary: 'boolean' },
      },
      description: 'Changes if required',
      defaultValue: {
        summary: false
      },
      options: [true, false],
      control: {
        type: 'boolean'
      }
    },
    type: {
      type: { name: 'string', required: false },
      table: {
        type: { summary: ['"number"', '"text"', 'etc.'] },
      },
      description: 'It may be one of the html input tag types',
      defaultValue: {
        summary: '"text"'
      },
      options: ['"number"', '"text"'],
      control: {
        type: 'inline-radio'
      }
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    type: 'text',
    placeholder: 'Type text...',
    required: true
  }
};

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: '0.000001',
    step: 0.000001,
    min: 0.000001,
    required: true
  }
};
