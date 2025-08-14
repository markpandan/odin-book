import { describe, it, vi } from "vitest";

describe("Home Page", () => {
  it("sees the loading page when fetching login", () => {
    global.fetch = vi.fn();
  });

  it("sees error message when username or password is incorrect", () => {});
});
