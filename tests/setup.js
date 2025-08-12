import { expect, afterEach } from "vitest";
import { cleanup, render } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import userEvent from "@testing-library/user-event";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

export const userSetup = (jsx) => {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
};
