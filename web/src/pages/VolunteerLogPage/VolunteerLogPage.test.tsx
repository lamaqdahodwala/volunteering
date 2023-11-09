import { render } from '@redwoodjs/testing/web'

import VolunteerLogPage from './VolunteerLogPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('VolunteerLogPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<VolunteerLogPage />)
    }).not.toThrow()
  })
})
