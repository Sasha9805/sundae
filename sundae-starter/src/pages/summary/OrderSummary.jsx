import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";

export default function OrderSummary({ setOrderPhase }) {
	const { totals, optionCounts } = useOrderDetails();

	const scoopArray = Object.entries(optionCounts.scoops);
	const scoopList = scoopArray.map(([key, value]) => (
		<li key={key}>
			{value} {key}
		</li>
	));

	const hasToppings = totals.toppings > 0;
	let toppingsDisplay = null;

	if (hasToppings) {
		const toppingArray = Object.keys(optionCounts.toppings);
		const toppingList = toppingArray.map((key) => <li key={key}>{key}</li>);

		toppingsDisplay = (
			<>
				<h2>Toppings: {formatCurrency(totals.toppings)}</h2>
				<ul>{toppingList}</ul>
			</>
		);
	}

	return (
		<div>
			<h1>Order Summary</h1>
			<h2>Scoops: {formatCurrency(totals.scoops)}</h2>
			<ul>{scoopList}</ul>
			{toppingsDisplay}
			<h2>Total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
			<SummaryForm setOrderPhase={setOrderPhase} />
		</div>
	);
}
