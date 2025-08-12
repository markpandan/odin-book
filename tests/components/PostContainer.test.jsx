import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import PostContainer from "../../src/components/PostContainer";
import { userSetup } from "../setup";

describe("PostContainer component", () => {
  it("should call the onLike function when clicked", async () => {
    const onClick = vi.fn();
    const { user } = userSetup(<PostContainer onLike={onClick} />);

    const button = screen.getByRole("button", { name: "Like" });
    await user.click(button);

    expect(onClick).toHaveBeenCalled();
  });

  it("shouldn't call the onLike function when not clicked", async () => {
    const onClick = vi.fn();
    userSetup(<PostContainer onLike={onClick} />);

    expect(onClick).not.toHaveBeenCalled();
  });

  it("should call the onComment function when clicked", async () => {
    const onClick = vi.fn();
    const { user } = userSetup(<PostContainer onComment={onClick} />);

    const button = screen.getByRole("button", { name: "Comment" });
    await user.click(button);

    expect(onClick).toHaveBeenCalled();
  });

  it("shouldn't call the onComment function when not clicked", async () => {
    const onClick = vi.fn();
    userSetup(<PostContainer onComment={onClick} />);

    expect(onClick).not.toHaveBeenCalled();
  });
});
