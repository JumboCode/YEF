import React, { Component } from "react";
import "./style.css";

class BallotEnterResults extends React.Component {
	constructor(props) {
		super(props);
		
	}

	render() {
		return (
			<h1>Team Name 1 vs Team Name 2</h1>
			<h2>Room # and Time</h2>
			<h2>Round #</h2>

			<form>
				<div id = "motion-container">
					<label htmlFor="motion-chosen"> Chosen</label>
					<input id = "motion-chosen"
						type = "text"
						placeholder = "Chosen"
						/>
					<label htmlFor="motion-aff"> Aff Veto</label>
					<input id = "motion-aff"
						type = "text"
						placeholder = "Aff Veto"
					/>

					<label htmlFor="motion-neg"> Neg Veto</label>
					<input id = "motion-neg"
						type = "text"
						placeholder = "Neg Veto"
					/>
				</div>
				<div id = "ballot-container">
					<div id = "left-team-member">
						<div>

							<input
								type = "text"
								placeholder = "Name"
							/>
							<input
								type = "text"
								placeholder = "Score"
							/>
						</div>
						<div>

							<input
								type = "text"
								placeholder = "Name"
							/>
							<input
								type = "text"
								placeholder = "Score"
							/>
						</div>
						<div>

							<input
								type = "text"
								placeholder = "Name"
							/>
							<input
								type = "text"
								placeholder = "Score"
							/>
						</div>
					</div>
					<div id = "right-team-member">
						<div>

							<input
								type = "text"
								placeholder = "Name"
							/>
							<input
								type = "text"
								placeholder = "Score"
							/>
						</div>
						<div>

							<input
								type = "text"
								placeholder = "Name"
							/>
							<input
								type = "text"
								placeholder = "Score"
							/>
						</div>
						<div>

							<input
								type = "text"
								placeholder = "Name"
							/>
							<input
								type = "text"
								placeholder = "Score"
							/>
						</div>
					</div>
				</div>
			</form>
		);
	}


}


export default BallotEnterResults;