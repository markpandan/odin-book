import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CommentItem from "../../src/components/CommentItem";

describe("CommentItem component", () => {
  it("Should display the proper user", () => {
    const fullName = "Leroy Jenkins";
    render(<CommentItem user={fullName} />);

    const user = screen.getByRole("heading", { name: fullName });
    expect(user).toBeInTheDocument();
  });

  it("Should display the proper content", () => {
    const comment = "Hello there!";
    render(<CommentItem>{comment}</CommentItem>);

    const user = screen.getByText(comment);
    expect(user).toBeInTheDocument();
  });
});
