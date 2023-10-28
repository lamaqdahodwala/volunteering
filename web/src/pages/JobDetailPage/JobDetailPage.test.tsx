import { render } from '@redwoodjs/testing/web'

import JobDetailPage from './JobDetailPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('JobDetailPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<JobDetailPage />)
    }).not.toThrow()
  })
})
