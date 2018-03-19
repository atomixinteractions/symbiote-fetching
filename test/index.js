import test from 'ava'
import { createSymbiote } from 'redux-symbiote'
import { createFetching, fetchStatus, handleFetching, initialFetching } from '../lib/index'


test('fetching status different', (t) => {
  const values = Object.values(initialFetching)
  const unique = [...new Set(values)]

  t.is(values.length, unique.length)
})
