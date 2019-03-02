import test from "ava"
import { fetchStatus, initialFetching } from "../../src/index"

test("default initialFetching makes default object", (t) => {
  const { status, error } = initialFetching

  t.is(status, fetchStatus.initial, "status should be initial")
  t.is(error, null, "no error on inital status")
})
