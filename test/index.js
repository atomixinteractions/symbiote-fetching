import test from 'ava'
import { createSymbiote } from 'redux-symbiote'
import {
  createFetching,
  fetchStatus,
  handleFetching,
  initialFetching,
  isReady,
  isFailed,
  isInitial,
  isLoading,
} from '../src/index'


test('fetching status different', (t) => {
  const values = Object.values(initialFetching)
  const unique = [...new Set(values)]

  t.is(values.length, unique.length)
})

test('isReady should be true', (t) => {
  t.is(isFailed(fetchStatus.ready), false)
  t.is(isReady(fetchStatus.ready), true)
  t.is(isInitial(fetchStatus.ready), false)
  t.is(isLoading(fetchStatus.ready), false)
})

test('isFailed should be true', (t) => {
  t.is(isFailed(fetchStatus.failed), true)
  t.is(isReady(fetchStatus.failed), false)
  t.is(isInitial(fetchStatus.failed), false)
  t.is(isLoading(fetchStatus.failed), false)
})

test('isInitial should be true', (t) => {
  t.is(isFailed(fetchStatus.initial), false)
  t.is(isReady(fetchStatus.initial), false)
  t.is(isInitial(fetchStatus.initial), true)
  t.is(isLoading(fetchStatus.initial), false)
})

test('isLoading should be true', (t) => {
  t.is(isFailed(fetchStatus.loading), false)
  t.is(isReady(fetchStatus.loading), false)
  t.is(isInitial(fetchStatus.loading), false)
  t.is(isLoading(fetchStatus.loading), true)
})
