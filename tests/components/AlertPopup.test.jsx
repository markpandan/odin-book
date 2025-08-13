import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import AlertPopup from "../../src/components/AlertPopup";
import { userSetup } from "../setup";

describe("AlertPopup component", () => {
  it("should call the onClose function", async () => {
    const onClose = vi.fn();

    const { user } = userSetup(<AlertPopup onClose={onClose} />);
    const button = screen.getByRole("button", { name: "Close Button" });
    await user.click(button);

    expect(onClose).toHaveBeenCalled();
  });
});
