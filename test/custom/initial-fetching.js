import test from "ava"
import { fetchStatus, createSymbioteFetcher } from "../../src/index"

test("default initialFetching makes default object", (t) => {
  const { initialFetching } = createSymbioteFetcher({
    propStatus: "st",
    propError: "err",
  })

  t.is(initialFetching.st, fetchStatus.initial, "status should be initial")
  t.is(initialFetching.err, null, "no error on inital status")
})
