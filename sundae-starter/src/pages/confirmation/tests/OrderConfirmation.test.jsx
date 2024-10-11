import { render, screen } from "../../../test-utils/testing-library-utils";
import OrderConfirmation from "../OrderConfirmation";
import { http, HttpResponse } from "msw";
import { server } from "../../../mocks/server";

test("Error response from server for submitting order", async () => {
	server.resetHandlers(
		http.post("http://localhost:3030/order", () => {
			return new HttpResponse(null, { status: 500 });
		})
	);

	render(<OrderConfirmation />);

	const alert = await screen.findByRole("alert");

	expect(alert).toHaveTextContent(
		"An unexpected error occurred. Please try again later."
	);
});
