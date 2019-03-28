import test from "ava"
import { createSymbiote } from "redux-symbiote"
import { fetchStatus, initialFetching, createFetching } from "../../src/index"

const create = () => {
  const prop = "property"
  return {
    prop,
    fetching: createFetching(prop),
  }
}

const createDeepState = (lvl = 1, lastValue = initialFetching) => {
  const state = {}
  let prevLvl = state

  for (let i = lvl; i >= 0; i -= 1) {
    if (i === 0) {
      prevLvl[i] = lastValue
      prevLvl = prevLvl[i]
    } else {
      prevLvl[i] = {}
      prevLvl = prevLvl[i]
    }
  }

  return state
}

test("createFetching should provide 3 actions", (t) => {
  const { fetching } = create()

  t.true(typeof fetching.start === "function", ".start should be function")
  t.true(typeof fetching.fail === "function", ".fail should be function")
  t.true(typeof fetching.finish === "function", ".finish should be function")
})

test("fetching.start should transition to loading", (t) => {
  const { fetching, prop } = create()
  const state = fetching.start({})

  t.is(state[prop].status, fetchStatus.loading, "state should be loading")
  t.is(state[prop].error, null, "error should be null")
})

test("fetching.finish should transition to ready", (t) => {
  const { fetching, prop } = create()
  const state = fetching.finish({})

  t.is(state[prop].status, fetchStatus.ready, "state should be ready")
  t.is(state[prop].error, null, "error should be null")
})

test("fetching.fail should transition to failed", (t) => {
  const { fetching, prop } = create()
  const error = new Error("test")
  const state = fetching.fail({}, error)

  t.is(state[prop].status, fetchStatus.failed, "state should be fail")
  t.is(state[prop].error, error, "error should exists")
})

test.todo(
  "each action should correctly switch from one to another status and check error",
)

test("symbiote create correct actions types", (t) => {
  const initial = {
    fetching: initialFetching,
  }
  const symbiotes = {
    fetch: createFetching("fetching"),
  }
  const { actions } = createSymbiote(initial, symbiotes)

  t.deepEqual(
    Object.keys(actions.fetch),
    ["start", "finish", "fail"],
    "create actions for fetching",
  )

  t.is(actions.fetch.start.toString(), "fetch/start")
  t.is(actions.fetch.fail.toString(), "fetch/fail")
  t.is(actions.fetch.finish.toString(), "fetch/finish")
})

test("symbiote correctly updates state", (t) => {
  const initial = {
    fetching: initialFetching,
  }
  const symbiotes = {
    fetch: createFetching("fetching"),
  }
  const { actions, reducer } = createSymbiote(initial, symbiotes)

  t.deepEqual(reducer(initial, actions.fetch.start()), {
    fetching: { status: fetchStatus.loading, error: null },
  })

  t.deepEqual(reducer(initial, actions.fetch.finish()), {
    fetching: { status: fetchStatus.ready, error: null },
  })

  t.deepEqual(reducer(initial, actions.fetch.fail("SOME_ERROR")), {
    fetching: { status: fetchStatus.failed, error: "SOME_ERROR" },
  })
})

test.only("symbiote correctly updates random deep", (t) => {
  const lvl = Math.floor(Math.random() * 20)
  const path = Array.from({ length: lvl + 1 }, (_, i) => i)
    .reverse()
    .join(".")
  const initial = createDeepState(lvl)
  const symbiotes = {
    fetch: createFetching(path),
  }
  const { actions, reducer } = createSymbiote(initial, symbiotes)

  t.deepEqual(
    reducer(initial, actions.fetch.start()),
    createDeepState(lvl, { status: fetchStatus.loading, error: null }),
  )

  t.deepEqual(
    reducer(initial, actions.fetch.finish()),
    createDeepState(lvl, { status: fetchStatus.ready, error: null }),
  )

  t.deepEqual(
    reducer(initial, actions.fetch.fail("SOME_ERROR")),
    createDeepState(lvl, { status: fetchStatus.failed, error: "SOME_ERROR" }),
  )
})
