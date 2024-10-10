import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import ScoopOption from "../ScoopOption";

test("Indicate if scoop count is non-int or out of range", async () => {
	const user = userEvent.setup();

	render(<ScoopOption />);

	const input = screen.getByRole("spinbutton");

	// expect input to be invalid with negative number
	await user.clear(input);
	await user.type(input, "-1");
	expect(input).toHaveClass("is-invalid");

	// replace with decimal input
	await user.clear(input);
	await user.type(input, "1.5");
	expect(input).toHaveClass("is-invalid");

	// replace with input that's too high
	await user.clear(input);
	await user.type(input, "11");
	expect(input).toHaveClass("is-invalid");

	// replace with valid input
	// note: here we're testing our validation rules (namely that the input can display as valid)
	// and not react-bootstrap's response
	await user.clear(input);
	await user.type(input, "3");
	expect(input).not.toHaveClass("is-invalid");
});
