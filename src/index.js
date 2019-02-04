const { fetchStatus, isFailed, isInitial, isLoading, isReady } = require('./status')
const { createSymbioteFetcher } = require('./advanced')

// TODO: remove deprecated handleFetchingF
const {
  initialFetching, createFetching, handleFetching, handleFetchingF, handleFnFetching,
} = createSymbioteFetcher()

module.exports = {
  fetchStatus,
  createSymbioteFetcher,
  initialFetching,
  createFetching,
  handleFetching,
  handleFetchingF,
  handleFnFetching,
  isReady,
  isFailed,
  isInitial,
  isLoading,
}
