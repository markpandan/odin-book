import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { userSetup } from "../setup";
import { ColorSchemeProvider } from "../../src/contexts/ColorSchemeContext";
import Navbar from "../../src/components/Navbar";

vi.mock("react-router-dom", () => {
  const Link = vi.fn(({ to, children }) => <a href={to}>{children}</a>);
  return { Link };
});

describe("Navbar component", () => {
  it("changes the light and dark theme of the website", async () => {
    const { user } = userSetup(
      <ColorSchemeProvider>
        <Navbar />
      </ColorSchemeProvider>
    );

    const darkModeToggler = screen.getByRole("button", {
      name: "Dark Mode Toggler",
    });

    const theme = localStorage.getItem("theme");
    const reverseTheme = theme == "light" ? "dark" : "light";

    let localThemeValue;

    await user.click(darkModeToggler);
    localThemeValue = localStorage.getItem("theme");
    expect(
      localThemeValue !== theme && localThemeValue == reverseTheme
    ).toBeTruthy();

    await user.click(darkModeToggler);
    localThemeValue = localStorage.getItem("theme");
    expect(
      localThemeValue == theme && localThemeValue !== reverseTheme
    ).toBeTruthy();
  });

  it("displays the login and signup link when not logged in", () => {
    const user = {};

    render(
      <ColorSchemeProvider>
        <Navbar user={user} />
      </ColorSchemeProvider>
    );

    expect(screen.getByRole("link", { name: "Log In" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Sign Up" })).toBeInTheDocument();
  });

  it("displays the username and logout link when logged in", () => {
    const user = { username: "mark" };

    render(
      <ColorSchemeProvider>
        <Navbar user={user} />
      </ColorSchemeProvider>
    );

    expect(screen.getByAltText(user.username)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Log Out" })).toBeInTheDocument();
  });
});
