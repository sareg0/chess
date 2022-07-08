import { test } from "vitest";
import {render } from '@testing-library/vue'

import HelloWorld from "../HelloWorld.vue";

test('HelloWorld', async () => {
  const {getByText} = render(HelloWorld, { props: {
    msg: "Hello Vitest"
  }})
  getByText('Hello Vitest')
})