import type { Meta, StoryObj } from '@storybook/react';

import { Modal } from '@/components/modal';
import { ModalPropsType } from '@/components/modal/modal';
import { Button } from '@/components/button';
import { Input } from '@/components/input';

const subtitle = 'A modal component.'
const description = `Now we have only 1 dark background color marked as "default".
  Modal outer wrapper background color is transparent.`

const meta  = {
  title: 'Coinapp/Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: subtitle,
    docs: {
      autodocs: true,
      controls: { exclude: ['style'] },
      title: 'Modal',
      description: {
        component: description
      }
    },
  },
  argTypes: {
    title: {
      type: { name: 'string', required: false },
      table: {
        type: { summary: 'string' },
      },
      description: 'You can add title of modal'
    },
    close: {
      type: { name: 'function', required: true },
      table: {
        type: { summary: '(() => void)' },
      },
      description: 'External function that starts when the close button is pressed',
    },
    children: {
      type: { name: 'string', required: false },
      table: {
        type: { summary: 'node' },
      },
      control: {
        type: 'object'
      },
      description: 'Node inside a modal. Don\'t have a default value.'
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

const styles = {
  container: {
    height: 200,
    position: 'relative',
  } as React.CSSProperties,
  modal: {
    position: 'absolute',
    height:'inherit',
    width:'inherit',
  } as React.CSSProperties,
};

export const WithTitle: Story = (args: JSX.IntrinsicAttributes & ModalPropsType) => (
  <div style={styles.container}>
    <Modal style={styles.modal} {...args} />
  </div>
);

WithTitle.args = {
  title: 'Title',
  close: () => {},
  children: (
    <div style={{display:'flex', gap: 8}}>
      <Input placeholder='type...'/>
      <Button>Do something</Button>
    </div>
  ),
};

export const WithoutTitle: Story = (args: JSX.IntrinsicAttributes & ModalPropsType) => (
  <div style={styles.container}>
    <Modal style={styles.modal} {...args} />
  </div>
);

WithoutTitle.args = {
  close: () => console.log('close'),
  children: 'Just report for some reason...',
};
