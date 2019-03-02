const {
  fetchStatus,
  isFailed,
  isInitial,
  isLoading,
  isReady,
} = require("./status")
const { createSymbioteFetcher } = require("./advanced")

const {
  initialFetching,
  createFetching,
  handleFetching,
  handleFnFetching,
} = createSymbioteFetcher()

module.exports = {
  fetchStatus,
  createSymbioteFetcher,
  initialFetching,
  createFetching,
  handleFetching,
  handleFnFetching,
  isReady,
  isFailed,
  isInitial,
  isLoading,
}
