import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function OrderConfirmation({ setOrderPhase }) {
	const { resetOrder } = useOrderDetails();
	const [orderNumber, setOrderNumber] = useState(null);

	const handleClick = () => {
		// clear the order details
		resetOrder();

		// send back to order page
		setOrderPhase("inProgress");
	};

	useEffect(() => {
		axios
			// in a real app we would get order details from context
			// and send with POST
			.post("http://localhost:3030/order")
			.then((response) => setOrderNumber(response.data.orderNumber))
			.catch((error) => {});
	}, []);

	if (!orderNumber) {
		return <p>Loading</p>;
	}

	return (
		<div style={{ textAlign: "center" }}>
			<h1>Thank you!</h1>
			<p>Your order number is {orderNumber}</p>
			<p style={{ fontSize: "25%" }}>
				as per our terms and conditions, nothing will happen now
			</p>
			<Button onClick={handleClick}>Create new order</Button>
		</div>
	);
}
