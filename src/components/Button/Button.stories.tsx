import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Button',
    type: 'button',
    size: 'medium'
  },
  argTypes: {
    variant: {
      options: ['primary', 'secondary'],
      control: 'radio'
    },
    size: {
      options: ['small', 'medium'],
      control: { type: 'radio' }
    }
  },
  decorators: [
    (Story) => (
      <div className='m-3'>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary button'
  }
};

export const Size: Story = {
  render: (args) => (
    <div className='flex gap-2'>
      <Button size='small'>
        {args.children}
      </Button>
      <Button>
        {args.children}
      </Button>
    </div>
  )
};