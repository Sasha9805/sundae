import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("OrderPhases for happy path", async () => {
	const user = userEvent.setup();

	// render app
	render(<App />);

	// add ice cream scoops and toppings
	const vanillaInput = await screen.findByRole("spinbutton", {
		name: "Vanilla",
	});
	await user.clear(vanillaInput);
	await user.type(vanillaInput, "1");

	const chocolateInput = screen.getByRole("spinbutton", {
		name: "Chocolate",
	});
	await user.clear(chocolateInput);
	await user.type(chocolateInput, "2");

	const cherriesCheckbox = await screen.findByRole("checkbox", {
		name: "Cherries",
	});
	await user.click(cherriesCheckbox);

	// find and click order summary button
	const orderSummaryButton = screen.getByRole("button", {
		name: /order sundae/i,
	});
	await user.click(orderSummaryButton);

	// check summary subtotals
	const summaryHeading = screen.getByRole("heading", {
		name: "Order Summary",
	});
	expect(summaryHeading).toBeInTheDocument();

	const scoopsHeading = screen.getByRole("heading", {
		name: "Scoops: $6.00",
	});
	expect(scoopsHeading).toBeInTheDocument();

	const toppingsHeading = screen.getByRole("heading", {
		name: "Toppings: $1.50",
	});
	expect(toppingsHeading).toBeInTheDocument();

	// check summary option items (li)
	expect(screen.getByText("1 Vanilla")).toBeInTheDocument();
	expect(screen.getByText("2 Chocolate")).toBeInTheDocument();
	expect(screen.getByText("Cherries")).toBeInTheDocument();
	/* alternative:
		const optionItems = screen.getAllByRole('listitem');
		const optionItemsText = optionItems.map(item => item.textContent);
		expect(optionItemsText).toEqual(['1 Vanilla', '2 Chocolate', 'Cherries'])
	*/

	// accept terms and conditions and click button to confirm order
	const tcCheckbox = screen.getByRole("checkbox", {
		name: /i agree to terms and conditions/i,
	});
	await user.click(tcCheckbox);

	const confirmOrderButton = screen.getByRole("button", {
		name: /confirm order/i,
	});
	await user.click(confirmOrderButton);

	// expect 'loading' to show
	const loading = screen.getByText(/loading/i);
	expect(loading).toBeInTheDocument();

	// check confirmation page text
	const thankYouHeader = await screen.findByRole("heading", {
		name: /thank you/i,
	});
	expect(thankYouHeader).toBeInTheDocument();

	// expect that loading has disappeared
	const notLoading = screen.queryByText(/loading/i);
	expect(notLoading).not.toBeInTheDocument();

	const orderNumber = screen.getByText(/order number/i);
	expect(orderNumber).toBeInTheDocument();

	// find click new order button on confirmation page
	const newOrderButton = await screen.findByRole("button", {
		name: /new order/i,
	});
	await user.click(newOrderButton);

	// check that scoops and topping have been reset
	const scoopsTotal = await screen.findByText("Scoops total: $0.00");
	expect(scoopsTotal).toBeInTheDocument();

	const toppingsTotal = screen.getByText("Toppings total: $0.00");
	expect(toppingsTotal).toBeInTheDocument();
});
