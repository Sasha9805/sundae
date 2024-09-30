import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

test("Initial Conditions", () => {
	render(<SummaryForm />);

	const checkbox = screen.getByRole("checkbox", {
		name: /terms and conditions/i,
	});
	expect(checkbox).not.toBeChecked();

	const confirmButton = screen.getByRole("button", {
		name: /confirm order/i,
	});
	expect(confirmButton).toBeDisabled();
});

test("Checkbox enables button on first click and disables on second click", async () => {
	const user = userEvent.setup();

	render(<SummaryForm />);

	const checkbox = screen.getByRole("checkbox", {
		name: /terms and conditions/i,
	});
	const confirmButton = screen.getByRole("button", {
		name: /confirm order/i,
	});

	await user.click(checkbox);
	expect(confirmButton).toBeEnabled();

	await user.click(checkbox);
	expect(confirmButton).toBeDisabled();
});

test("Popover responds to hover", async () => {
	const user = userEvent.setup();

	// popover starts out hidden

	// popover appears on mouseover of checkbox label

	// popover disappears when we mouse out
});
