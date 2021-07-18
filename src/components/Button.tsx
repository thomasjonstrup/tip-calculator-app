import React, { useCallback } from "react";

export interface buttonElement {
	name: string;
	text: string;
	value: number;
	type: string;
	active?: boolean;
	onChange?: (text: number, name: any) => void;
}

const Button: React.FC<buttonElement> = ({
	name,
	text,
	active,
	value,
	type,
	onChange = (text: number, name: any) => {},
}) => {
	const handleChange = useCallback(() => {
		onChange(value, name);
	}, [onChange, value, name]);

	return (
		<button
			name={name}
			className={`btn btn--${type}${active ? " btn--active" : ""}`}
			onClick={handleChange}
		>
			{text}
		</button>
	);
};

export default Button;
