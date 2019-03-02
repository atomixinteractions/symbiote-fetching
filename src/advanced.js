const { fetchStatus } = require("./status")

/**
 * @typedef {Object} Action
 * @prop {string} type
 */

function createSymbioteFetcher({
  propStatus = "status",
  propError = "error",
} = {}) {
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
   * @param {{ start: () => Action, finish: () => Action, fail: (error: Error) => Action }} actions
   * @param {{ before?: Function, run: Function, fail?: Function, noThrow: boolean }} fetcherObject
   * @example
   * export const fetchData = (id) => handleFetching(actions.fetching, {
   *   noThrow: true,
   *   prepareError: (error) => error.message,
   *   async before(dispatch) {
   *     return await dispatch(someEffect())
   *   },
   *   async run(dispatch, getState, { api }) {
   *     const result = await api.get(`/data/${id}`)
   *s
   *     dispatch(actions.setData(result.data))
   *   },
   * })
   */
  const handleFetching = (actions, fetcherObject) => async (
    dispatch,
    getState,
    extra,
  ) => {
    let beforeResult

    dispatch(actions.start())

    if (fetcherObject.before) {
      beforeResult = await fetcherObject.before(dispatch, getState, extra)
    }

    try {
      const result = await fetcherObject.run(
        dispatch,
        getState,
        extra,
        beforeResult,
      )

      dispatch(actions.finish())
      return result
    } catch (error) {
      if (fetcherObject.fail) {
        fetcherObject.fail(error, dispatch, getState, extra, beforeResult)
      }

      dispatch(
        actions.fail(
          fetcherObject.prepareError
            ? fetcherObject.prepareError(error)
            : error,
        ),
      )

      if (fetcherObject.noThrow) {
        return undefined
      }

      throw error
    }
  }

  const handleFnFetching = (actions, runFn) => async (
    dispatch,
    getState,
    extra,
  ) => {
    try {
      dispatch(actions.start())
      const result = await runFn(dispatch, getState, extra)

      dispatch(actions.finish())
      return result
    } catch (error) {
      dispatch(actions.fail(error))
      return undefined
    }
  }

  return {
    initialFetching,
    createFetching,
    handleFetching,
    handleFnFetching,
  }
}

module.exports = {
  createSymbioteFetcher,
}
