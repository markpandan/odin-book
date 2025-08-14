import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import InputField from "../../src/components/InputField";
import { userSetup } from "../setup";

describe("InputField Component", () => {
  it("displays the proper label name", () => {
    const label = "Lorem Ipsum";

    render(<InputField name={"test"} label={label} />);
    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });

  it("display the proper input value", () => {
    const value = "Lorem Ipsum";

    render(<InputField name={"test"} value={value} />);

    const inputField = screen.getByRole("textbox");
    expect(inputField.value).toBe(value);
  });

  it("triggers the onChange callback when typing", async () => {
    const onChange = vi.fn();

    const { user } = userSetup(
      <InputField name={"test"} onChange={onChange} />
    );

    const inputField = screen.getByRole("textbox");
    await user.type(inputField, "Lorem Ipsum");

    expect(onChange).toHaveBeenCalled();
  });
});
