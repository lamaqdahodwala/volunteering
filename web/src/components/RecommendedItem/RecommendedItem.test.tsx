import { render } from '@redwoodjs/testing/web'

import RecommendedItem from './RecommendedItem'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('RecommendedItem', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RecommendedItem />)
    }).not.toThrow()
  })
})
