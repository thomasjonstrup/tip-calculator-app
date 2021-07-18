import React from "react";

export interface attributonElement {
	name: string;
	url: string;
}

const Attribution: React.FC<attributonElement> = ({ name, url }) => {
	return (
		<div className="attribution">
			{"Challenge by "}
			<a
				href="https://www.frontendmentor.io?ref=challenge"
				target="_blank"
				rel="noreferrer"
			>
				{"Frontend Mentor"}
			</a>
			. Coded by <a href={url}>{name}</a>.
		</div>
	);
};

export default Attribution;
