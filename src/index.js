
const fetchStatus = {
  failed: -1,
  initial: 0,
  loading: 1,
  ready: 2,
}

const propStatus = 'status'
const propError = 'error'

/**
 * @example
 * const initialState = {
 *   status: initialFetching,
 * }
 */
const initialFetching = {
  [propStatus]: fetchStatus.initial,
  [propError]: null,
}

/**
 * @param {string} stateProperty
 * @return {{ start: Function, finish: Function, fail: Function }}
 * @example
 * createSymbiote(initialState, {
 *   fetching: createFetching('status'),
 * })
 */
const createFetching = (stateProperty) => ({
  start: (state) => ({
    ...state,
    [stateProperty]: { [propStatus]: fetchStatus.loading, [propError]: null },
  }),
  finish: (state) => ({
    ...state,
    [stateProperty]: { [propStatus]: fetchStatus.ready, [propError]: null },
  }),
  fail: (state, error) => ({
    ...state,
    [stateProperty]: { [propStatus]: fetchStatus.failed, [propError]: error },
  }),
})

/**
 * @typedef {Object} Action
 * @prop {string} type
 */

/**
 * @param {{ start: () => Action, finish: () => Action, fail: (error: Error) => Action }} actions
 * @param {{ before?: () => Promise<any>, run: () => Promise<any>, fail?: () => void }} fetcher
 * @example
 * export const fetchData = (id) => handleFetching(actions.fetching, {
 *   async run(dispatch, getState, { api }) {
 *     const result = await api.get(`/data/${id}`)
 *
 *     dispatch(actions.setData(result.data))
 *   }
 * })
 */
const handleFetching = (actions, fetcher) => (
  async (dispatch, getState, extra) => {
    let beforeResult

    dispatch(actions.start())

    if (fetcher.before) {
      beforeResult = await fetcher.before(dispatch, getState, extra)
    }

    try {
      await fetcher.run(dispatch, getState, extra, beforeResult)
      dispatch(actions.finish())
    }
    catch (error) {
      if (fetcher.fail) {
        fetcher.fail(error, dispatch, getState, extra)
      }
      else {
        dispatch(actions.fail(error))
      }
    }
  }
)

const handleFetchingF = (actions, runFn) => (
  async (dispatch, getState, extra) => {
    try {
      dispatch(actions.start())
      const result = await runFn(dispatch, getState, extra)

      dispatch(actions.finish())
      return result
    }
    catch (error) {
      dispatch(actions.fail(error))
      return undefined
    }
  }
)

module.exports = {
  fetchStatus,
  initialFetching,
  createFetching,
  handleFetching,
  handleFetchingF,
}
