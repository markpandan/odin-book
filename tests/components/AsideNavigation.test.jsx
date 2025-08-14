import { describe, expect, vi, it } from "vitest";
import { userSetup } from "../setup";
import AsideNavigation from "../../src/components/AsideNavigation";
import { screen } from "@testing-library/react";

vi.mock("react-router-dom", () => {
  const Link = vi.fn(({ to, children }) => <a href={to}>{children}</a>);
  return { Link };
});

describe("AsideNavigation component", () => {
  it("highlights the item when clicked", async () => {
    const { user } = userSetup(<AsideNavigation />);

    const listItems = screen.getAllByRole("listitem");
    await user.click(listItems[1]);

    expect(listItems[1].className).toBe("bg-[var(--accent-color)]");
  });
});
