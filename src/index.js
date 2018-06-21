const { fetchStatus } = require('./status')
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
}
