import { render } from '@redwoodjs/testing/web'

import ScheduleItem from './ScheduleItem'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ScheduleItem', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ScheduleItem />)
    }).not.toThrow()
  })
})
