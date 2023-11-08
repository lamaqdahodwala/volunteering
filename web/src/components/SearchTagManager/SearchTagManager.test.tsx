import { render } from '@redwoodjs/testing/web'

import SearchTagManager from './SearchTagManager'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SearchTagManager', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SearchTagManager />)
    }).not.toThrow()
  })
})
