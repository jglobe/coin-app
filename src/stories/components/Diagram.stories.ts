import type { Meta, StoryObj } from '@storybook/react';

import { Diagram } from '@/components/diagram';

const subtitle = 'A diagram component'
const description = `The diagram works with the resize observer, it changes its size when the width of the parent element changes.
  Diagram height without buttons 300px for desktop , less than 550px screen width it becomes 180px.`

const meta  = {
  title: 'Coinapp/Components/Diagram',
  component: Diagram,
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
    history: {
      type: { name: 'string', required: false },
      table: {
        type: { summary: `{
          priceUsd: string;
          time: number;
          date: string;
        }[]` },
      },
      description: 'Object array. Y-axis currency value, X-axis time value in UTC format, than will be formatted in "11.11.1111 11:11". If empty, will display "No data".',
      control: {
        type: 'object'
      },
    },
    setDateInterval: {
      type: { name: 'function', required: false },
      table: {
        type: { summary: 'function' },
      },
      description: 'Set state function from outside. It start when intervals button was pressed, get value from this button.'
    },
    dateInterval: {
      type: { name: 'string', required: false },
      table: {
        type: { summary: 'string' },
      },
      description: 'One of the element from intervals array. Displays only selected interval.',
      control: false,
    },
    intervals: {
      type: { name: 'string', required: false },
      table: {
        type: { summary: 'string[]' },
      },
      description: 'Array of string intervals elements. Needs to create buttons to set new interval of diagram. If array length < 2 don\'t create buttons.',
      control: {
        type: 'object'
      },
    },
  }
} satisfies Meta<typeof Diagram>;

export default meta;

type Story = StoryObj<typeof meta>;

const mockData = [
  {"priceUsd":"43523.7446026748729943","time":1649289600000,"date":"2022-04-07T00:00:00.000Z"},
  {"priceUsd":"43361.1193641799483156","time":1649376000000,"date":"2022-04-08T00:00:00.000Z"},
  {"priceUsd":"42545.5567667791201486","time":1649462400000,"date":"2022-04-09T00:00:00.000Z"},
  {"priceUsd":"42853.0578573159617594","time":1649548800000,"date":"2022-04-10T00:00:00.000Z"},
  {"priceUsd":"41291.5379690743041066","time":1649635200000,"date":"2022-04-11T00:00:00.000Z"},
  {"priceUsd":"39994.9145924884004410","time":1649721600000,"date":"2022-04-12T00:00:00.000Z"}
];

export const WithData: Story = {
  args: {
    history: mockData,
    setDateInterval: () => {},
    dateInterval: 'd1',
    intervals:['d1','m1']
  }
};

export const Empty: Story = {
  args: {
    history: [],
    setDateInterval: () => {},
    dateInterval: 'd1',
    intervals:['d1','m1']
  }
};
