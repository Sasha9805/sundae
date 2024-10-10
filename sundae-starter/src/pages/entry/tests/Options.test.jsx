import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

test("Displays image for each scoop option from server", async () => {
	render(<Options optionType="scoops" />);

	// find images
	const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
	expect(scoopImages).toHaveLength(2);

	// confirm alt text of images
	const altText = scoopImages.map((element) => element.alt);
	expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("Displays image for each topping option from server", async () => {
	render(<Options optionType="toppings" />);

	const toppingImages = await screen.findAllByRole("img", {
		name: /topping$/i,
	});
	expect(toppingImages).toHaveLength(3);

	const altText = toppingImages.map((element) => element.alt);
	expect(altText).toEqual([
		"Cherries topping",
		"M&Ms topping",
		"Hot fudge topping",
	]);
});

test("Don't update total if scoops input is invalid", async () => {
	const user = userEvent.setup();

	render(<Options optionType="scoops" />);

	const vanillaInput = await screen.findByRole("spinbutton", {
		name: "Vanilla",
	});
	const scoopsTotal = screen.getByText("Scoops total: $0.00");

	await user.clear(vanillaInput);
	await user.type(vanillaInput, "2.5");
	expect(scoopsTotal).toHaveTextContent("$0.00");

	await user.clear(vanillaInput);
	await user.type(vanillaInput, "100");
	expect(scoopsTotal).toHaveTextContent("$0.00");

	await user.clear(vanillaInput);
	await user.type(vanillaInput, "-1");
	expect(scoopsTotal).toHaveTextContent("$0.00");
});
