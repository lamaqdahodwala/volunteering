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

import ScheduleItem from './ScheduleItem'

const meta: Meta<typeof ScheduleItem> = {
  component: ScheduleItem,
}

export default meta

type Story = StoryObj<typeof ScheduleItem>

export const Primary: Story = {}
