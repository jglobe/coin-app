import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/components/button';

const subtitle = 'A simple button component that use all properties from html button tag.'
const description = `Now we have only 1 dark background color marked as "default".
  Button background color is transparent, so background may be different if parent color is not default.
  It\'s also true for the color property.`

const meta  = {
  title: 'Coinapp/Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: subtitle,
    docs: {
      autodocs: true,
      controls: { exclude: ['style'] },
      title: 'Button',
      description: {
        component: description
      }
    },
  },
  argTypes: {
    children: {
      type: { name: 'string', required: false },
      table: {
        type: { summary: 'node' },
      },
      description: 'Node inside a button. Don\'t have a default value'
    },
    className: {
      type: { name: 'string', required: false },
      table: {
        type: { summary: 'string' },
      },
      description: 'You can add another class'
    },
    onClick: {
      type: { name: 'function', required: false },
      table: {
        type: { summary: '(() => void)' },
      },
      description: 'Optional click handler',
    },
    type: {
      type: { name: 'string', required: false },
      table: {
        type: { summary: ['"submit"', '"button"'] },
      },
      description: 'It may be a submit or just button type',
      defaultValue: {
        summary: '"submit"'
      },
      options: ['"submit"', '"button"'],
      control: {
        type: 'inline-radio'
      }
    },
    disabled: {
      type: { name: 'boolean', required: false },
      table: {
        type: { summary: 'boolean' },
      },
      description: 'Changes if disabled',
      defaultValue: {
        summary: false
      },
      options: [true, false],
      control: {
        type: 'boolean'
      }
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default',
    type: 'submit',
    disabled: false,
  }
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    type: 'submit',
    disabled: true,
  }
};
