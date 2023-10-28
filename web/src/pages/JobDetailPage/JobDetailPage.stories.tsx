import type { Meta, StoryObj } from '@storybook/react'

import JobDetailPage from './JobDetailPage'

const meta: Meta<typeof JobDetailPage> = {
  component: JobDetailPage,
}

export default meta

type Story = StoryObj<typeof JobDetailPage>

export const Primary: Story = {}
