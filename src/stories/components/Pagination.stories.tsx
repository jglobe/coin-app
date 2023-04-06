import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Pagination } from '@/components/pagination';
import { PaginationPropsType } from '@/components/pagination/pagination';

const subtitle = 'A pagination component'
const description = `Now we have only 1 dark background color marked as "default".
  Buttons background color is transparent, so background may be different if parent color is not default.`

const meta  = {
  title: 'Coinapp/Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: subtitle,
    docs: {
      autodocs: true,
      controls: { exclude: ['style'] },
      title: 'Pagination',
      description: {
        component: description
      }
    },
  },
  argTypes: {
    page: {
      type: { name: 'number', required: false },
      table: {
        type: { summary: 'numer' },
      },
      description: 'Dusplay current page',
      control: false
    },
    disabledNext: {
      type: { name: 'boolean', required: false },
      table: {
        type: { summary: 'boolean' },
      },
      control: {
        type: 'boolean'
      },
      description: 'Makes "Next" button diasable'
    },
    prev: {
      type: { name: 'function', required: false },
      table: {
        type: { summary: 'function' },
      },
      description: 'Starts the function if the "Prev" button was pressed. If current page number is "1" will be disabled'
    },
    next: {
      type: { name: 'function', required: false },
      table: {
        type: { summary: 'function' },
      },
      description: 'Starts the function if the "Next" button was pressed'
    },
  }
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ExamplePagination: Story = (args:PaginationPropsType) => {
  const [page, setPage] = useState(args.page);
  return (
    <Pagination
      prev={() => setPage(page-1)}
      next={() => setPage(page+1)}
      page={page}
      disabledNext={args.disabledNext}
    />
  )
}

ExamplePagination.args = {
  page: 1,
  disabledNext: false
}
