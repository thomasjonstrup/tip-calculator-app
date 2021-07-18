import { useState } from "react";
import Button, { buttonElement } from "./components/Button";
import logo from "./images/logo.svg";

import "./scss/main.scss";

const initalState = {
	people: "",
	bill: 0,
	customTip: "",
	total: 0.0,
	totalTip: 0.0,
	tip: 0.0,
};

function App() {
	const buttons: buttonElement[] = [
		{ text: "5%", name: "tip", value: 5, type: "secondary" },
		{ text: "10%", name: "tip", value: 10, type: "secondary" },
		{ text: "15%", name: "tip", value: 15, type: "secondary" },
		{ text: "25%", name: "tip", value: 25, type: "secondary" },
		{ text: "50%", name: "tip", value: 50, type: "secondary" },
	];

	const [form, setForm] = useState(initalState);

	const callTotal = () => {
		console.log(`callTotalt`, form);

		let total = form.total;
		let totalTip = form.totalTip;

		if (form.bill) {
			total = form.bill;
		}

		if (total && form.people) {
			total = total / parseInt(form.people);
		}

		if (form.customTip && total > 0) {
			totalTip = (total / 100) * parseFloat(form.customTip);
		} else if (form.tip && total > 0) {
			totalTip = (total / 100) * form.tip;
		}

		setForm({ ...form, total: total, totalTip: totalTip });
	};

	const changeElement = (e: React.ChangeEvent<HTMLInputElement>): void => {
		let v: any = e.target.value;

		if (e.target.name === "bill") {
			v = parseFloat(e.target.value);
		}
		setForm({ ...form, [e.target.name]: v });

		/* callTotal(e.target.name, e.target.value); */
	};

	const selectTip = (value: any, name: any): void => {
		console.log(`name`, name);
		console.log(`value`, value);
		setForm({ ...form, [name]: value });
	};

	const reset = () => {
		setForm({ ...form, ...initalState });
	};

	return (
		<div className="app">
			<header className="header">
				<div className="header__logo">
					<img src={logo} alt="logo" />
				</div>
			</header>
			<main>
				<div className="container">
					<div className="main">
						<div className="main__column main__info">
							<div className="form__group">
								<label htmlFor="bill">Bill</label>
								<div className="input input__group">
									<span className="icon icon--dollar"></span>
									<input
										type="text"
										name="bill"
										id="bill"
										value={form.bill}
										placeholder="0"
										onChange={changeElement}
										onBlur={() => {
											console.log(`Blur`, form);
											callTotal();
										}}
									/>
								</div>
							</div>
							<h3>Select Tip %</h3>
							<div className="grid">
								{buttons.map(
									(element: buttonElement, index) => {
										const active =
											form.tip === element.value;
										return (
											<Button
												{...element}
												key={index}
												active={active}
												onChange={selectTip}
											/>
										);
									}
								)}
								<div className="grid__item input">
									<input
										type="text"
										name="customTip"
										placeholder="Custom"
										onChange={changeElement}
										onBlur={() => {
											console.log(`Blur`, form);
											callTotal();
										}}
									/>
								</div>
							</div>
							<div className="form__group">
								<label htmlFor="people">Number of People</label>
								<div className="input input__group">
									<span className="icon icon--person"></span>
									<input
										type="text"
										name="people"
										id="people"
										placeholder="0"
										value={form.people}
										onChange={changeElement}
										onBlur={() => {
											console.log(`Blur`, form);
											callTotal();
										}}
									/>
								</div>
							</div>
						</div>
						<div className="main__column main__result main__inner">
							<div className="row">
								<div>
									<p className="main__title">Tip Amount</p>
									<p className="main__description">
										/ person
									</p>
								</div>

								<div className="main__price">{`${form.totalTip.toFixed(
									2
								)}`}</div>
							</div>
							<div className="row mb-2">
								<div>
									<p className="main__title">Total</p>
									<p className="main__description">
										/ person
									</p>
								</div>

								<div className="main__price">{`${form.total.toFixed(
									2
								)}`}</div>
							</div>

							<Button
								text="Reset"
								name="reset"
								type="primary main__reset"
								value={1}
								onChange={reset}
							/>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

export default App;
