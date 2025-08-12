import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CommentModal from "../../src/components/CommentModal";
import { userSetup } from "../setup";

describe("CommentModal component", () => {
  it("should call the onClose function when clicked", async () => {
    const onClick = vi.fn();
    const { user } = userSetup(<CommentModal onClose={onClick} />);

    const button = screen.getByRole("button", { name: "Close" });
    await user.click(button);

    expect(onClick).toHaveBeenCalled();
  });

  it("shouldn't call the onComment function when not clicked", async () => {
    const onClick = vi.fn();
    userSetup(<CommentModal onClose={onClick} />);

    expect(onClick).not.toHaveBeenCalled();
  });
});
