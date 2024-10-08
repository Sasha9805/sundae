import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("Update scoop subtotal when scoops change", async () => {
	const user = userEvent.setup();
	render(<Options optionType="scoops" />);

	// make sure total starts out at $0.00
	const scoopsSubtotal = screen.getByText("Scoops total: $", {
		exact: false,
	});
	expect(scoopsSubtotal).toHaveTextContent("0.00");

	// update vanilla scoops to 1 and check subtotal
	const vanillaInput = await screen.findByRole("spinbutton", {
		name: "Vanilla",
	});

	await user.clear(vanillaInput);
	await user.type(vanillaInput, "1");
	expect(scoopsSubtotal).toHaveTextContent("2.00");

	// update chocolate scoops to 2 and check subtotal
	const chocolateInput = await screen.findByRole("spinbutton", {
		name: "Chocolate",
	});

	await user.clear(chocolateInput);
	await user.type(chocolateInput, "2");
	expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("Update topping subtotal when toppings change", async () => {
	const user = userEvent.setup();

	render(<Options optionType="toppings" />);

	// make sure total starts out at $0.00
	const toppingsTotal = screen.getByText("Toppings total: $", {
		exact: false,
	});
	expect(toppingsTotal).toHaveTextContent("0.00");

	// add cherries and check subtotal
	const cherriesCheckbox = await screen.findByRole("checkbox", {
		name: "Cherries",
	});
	// expect(cherriesCheckbox).not.toBeChecked();
	await user.click(cherriesCheckbox);
	expect(toppingsTotal).toHaveTextContent("1.50");

	// add hot fudge and check subtotal
	const hotFudgeCheckbox = await screen.findByRole("checkbox", {
		name: "Hot fudge",
	});
	// expect(hotFudgeCheckbox).not.toBeChecked();
	await user.click(hotFudgeCheckbox);
	expect(toppingsTotal).toHaveTextContent("3.00");

	// remove hot fudge and check subtotal
	await user.click(hotFudgeCheckbox);
	expect(toppingsTotal).toHaveTextContent("1.50");
});

describe("Grand total", () => {
	test("grand total starts at $0.00", () => {
		const { unmount } = render(<OrderEntry />);

		const grandTotal = screen.getByRole("heading", {
			name: /grand total: \$/i,
		});
		expect(grandTotal).toHaveTextContent("0.00");

		unmount();
	});
	test("grand total updates properly if scoop is added first", async () => {
		const user = userEvent.setup();

		render(<OrderEntry />);

		const grandTotal = screen.getByRole("heading", {
			name: /grand total: \$/i,
		});

		// update vanilla scoops to 2 and check grand total
		const vanillaInput = await screen.findByRole("spinbutton", {
			name: "Vanilla",
		});

		await user.clear(vanillaInput);
		await user.type(vanillaInput, "2");
		expect(grandTotal).toHaveTextContent("4.00");

		// add cherries and check grand total
		const cherriesCheckbox = await screen.findByRole("checkbox", {
			name: "Cherries",
		});
		await user.click(cherriesCheckbox);

		expect(grandTotal).toHaveTextContent("5.50");
	});
	test("grand total updates properly if topping is added first", async () => {
		const user = userEvent.setup();

		render(<OrderEntry />);

		const grandTotal = screen.getByRole("heading", {
			name: /grand total: \$/i,
		});

		// add cherries and check grand total
		const cherriesCheckbox = await screen.findByRole("checkbox", {
			name: "Cherries",
		});
		await user.click(cherriesCheckbox);
		expect(grandTotal).toHaveTextContent("1.50");

		// update vanilla scoops to 2 and check grand total
		const vanillaInput = await screen.findByRole("spinbutton", {
			name: "Vanilla",
		});

		await user.clear(vanillaInput);
		await user.type(vanillaInput, "2");
		expect(grandTotal).toHaveTextContent("5.50");
	});
	test("grand total updates properly if item is removed", async () => {
		const user = userEvent.setup();

		render(<OrderEntry />);

		const grandTotal = screen.getByRole("heading", {
			name: /grand total: \$/i,
		});

		// add cherries
		const cherriesCheckbox = await screen.findByRole("checkbox", {
			name: "Cherries",
		});
		await user.click(cherriesCheckbox);
		// grand total $1.50

		// update vanilla scoops to 2; grand total should be $5.50
		const vanillaInput = await screen.findByRole("spinbutton", {
			name: "Vanilla",
		});
		await user.clear(vanillaInput);
		await user.type(vanillaInput, "2");

		// remove 1 scoop of vanilla and check grand total
		await user.clear(vanillaInput);
		await user.type(vanillaInput, "1");
		expect(grandTotal).toHaveTextContent("3.50");

		// remove cherries and check grand total
		await user.click(cherriesCheckbox);
		expect(grandTotal).toHaveTextContent("2.00");
	});
});
