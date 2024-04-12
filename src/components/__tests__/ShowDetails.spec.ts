import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'

import ShowDetails from '../ShowDetails.vue'
import MOCK_SHOW from './show.json'

describe('ShowDetails', () => {
  it('renders properly', () => {
    const wrapper = mount(ShowDetails, { props: { show: MOCK_SHOW } })
    expect(wrapper.text()).toContain(MOCK_SHOW.name)
  })
})
