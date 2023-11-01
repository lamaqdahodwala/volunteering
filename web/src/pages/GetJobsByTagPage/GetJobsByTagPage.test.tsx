import { render } from '@redwoodjs/testing/web'

import GetJobsByTagPage from './GetJobsByTagPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('GetJobsByTagPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GetJobsByTagPage />)
    }).not.toThrow()
  })
})
