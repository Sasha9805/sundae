import Options from "./Options";
import { formatCurrency } from "../../utilities";
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function OrderEntry() {
	const { totals } = useOrderDetails();

	return (
		<div>
			<h1>Design Your Sundae!</h1>
			<Options optionType="scoops" />
			<Options optionType="toppings" />
			<h2>
				Grand total: {formatCurrency(totals.scoops + totals.toppings)}
			</h2>
		</div>
	);
}
