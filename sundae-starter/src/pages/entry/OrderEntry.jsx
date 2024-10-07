import Options from "./Options";
import Button from "react-bootstrap/Button";
import { formatCurrency } from "../../utilities";
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function OrderEntry({ setOrderPhase }) {
	const { totals } = useOrderDetails();

	return (
		<div>
			<h1>Design Your Sundae!</h1>
			<Options optionType="scoops" />
			<Options optionType="toppings" />
			<h2>
				Grand total: {formatCurrency(totals.scoops + totals.toppings)}
			</h2>
			<Button onClick={() => setOrderPhase("review")}>
				Order sundae!
			</Button>
		</div>
	);
}
