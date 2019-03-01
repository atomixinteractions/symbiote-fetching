import test from "ava"
import { createSymbiote } from "redux-symbiote"
import {
  createFetching,
  fetchStatus,
  handleFetching,
  initialFetching,
  isReady,
  isFailed,
  isInitial,
  isLoading,
} from "../src/index"

test("fetching status different", (t) => {
  const values = Object.values(initialFetching)
  const unique = [...new Set(values)]

  t.is(values.length, unique.length)
})

test("isInitial should return true only for .initial", (t) => {
  t.is(isInitial(fetchStatus.initial), true)
  t.is(isInitial(fetchStatus.loading), false)
  t.is(isInitial(fetchStatus.ready), false)
  t.is(isInitial(fetchStatus.failed), false)
})

test("isLoading should return true only for .loading", (t) => {
  t.is(isLoading(fetchStatus.initial), false)
  t.is(isLoading(fetchStatus.loading), true)
  t.is(isLoading(fetchStatus.ready), false)
  t.is(isLoading(fetchStatus.failed), false)
})

test("isReady should return true only for .ready", (t) => {
  t.is(isReady(fetchStatus.initial), false)
  t.is(isReady(fetchStatus.loading), false)
  t.is(isReady(fetchStatus.ready), true)
  t.is(isReady(fetchStatus.failed), false)
})

test("isFailed should return true only for .failed", (t) => {
  t.is(isFailed(fetchStatus.initial), false)
  t.is(isFailed(fetchStatus.loading), false)
  t.is(isFailed(fetchStatus.ready), false)
  t.is(isFailed(fetchStatus.failed), true)
})
