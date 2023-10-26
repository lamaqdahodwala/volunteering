// Pass props to your component by passing an `args` object to your story
//
// ```tsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta, StoryObj } from '@storybook/react'

import Tag from './Tag'

const meta: Meta<typeof Tag> = {
  component: Tag,
}

export default meta

type Story = StoryObj<typeof Tag>

export const Primary: Story = {
  args: {
    name: "Health",
    description: "Help people be healthy",
    id: 1
  }
}

export const LongDescription: Story = {

  args: {
    name: "health",
    description: "This is a really long description so i don't know if i should cut this off with a dot dot dot or not",
    id: 1
  }
}
