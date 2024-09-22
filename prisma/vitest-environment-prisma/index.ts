import type { Environment } from 'vitest/environments'

export default {
  name: 'prisma',
  transformMode: 'ssr',
  setup: () => {
    console.log('setup')
    return {
      teardown: () => {
        console.log('teardown')
      },
    }
  },
} as Environment
