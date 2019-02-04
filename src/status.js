const fetchStatus = {
  failed: -1,
  initial: 0,
  loading: 1,
  ready: 2,
}

const isReady = (status) => status === fetchStatus.ready
const isFailed = (status) => status === fetchStatus.failed
const isInitial = (status) => status === fetchStatus.initial
const isLoading = (status) => status === fetchStatus.loading

module.exports = {
  fetchStatus,
  isReady,
  isFailed,
  isInitial,
  isLoading,
}
