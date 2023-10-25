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

import RecommendedItem from './RecommendedItem'

const meta: Meta<typeof RecommendedItem> = {
  component: RecommendedItem,
}

export default meta

type Story = StoryObj<typeof RecommendedItem>

export const Primary: Story = {
  args: {
    id: 1,
    title: "My job",
    manager: {
      username: "JFK High school"
    },
    max_signups: 100,
    description: "This is a great place to volunteer at because you can get volunteer hours"
  }
}
