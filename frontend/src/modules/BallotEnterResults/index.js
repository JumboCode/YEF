import React, { Component } from 'react';
import './styles.css';

class BallotEnterResults extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Team Name 1 vs Team Name 2</h1>
        <p>Room # and Time</p>
        <p>Round #</p>

        <form autoComplete="off">
          <div id="motion-container" className="big-container">
            <h2 className="big-container-title"> Motion</h2>
            <div className="big-container-wo-title">
              <div className="motion-option-container">
                <label className="motion-option-label" htmlFor="motion-chosen">
                  Chosen
                </label>
                <input id="motion-chosen" type="text" placeholder="Chosen" />
              </div>
              <div className="motion-option-container">
                <label className="motion-option-label" htmlFor="motion-aff">
                  Aff Veto
                </label>
                <input id="motion-aff" type="text" placeholder="Aff Veto" />
              </div>
              <div className="motion-option-container">
                <label className="motion-option-label" htmlFor="motion-neg">
                  Neg Veto
                </label>
                <input id="motion-neg" type="text" placeholder="Neg Veto" />
              </div>
            </div>
          </div>
          <div id="ballot-container" className="big-container">
            <h2 className="big-container-title"> Ballot</h2>
            <div
              className="big-container-wo-title"
              id="ballot-options-container"
            >
              <fieldset id="left-team-member">
                <legend>Affirmative: Team Member 1</legend>
                <div className="ballot-member-container" id="one">
                  <label htmlFor="one">1. </label>
                  <input
                    className="name-input-field"
                    type="text"
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    placeholder="Score"
                    className="score-input-field"
                  />
                </div>
                <div className="ballot-member-container" id="two">
                  <label htmlFor="two">2. </label>
                  <input
                    className="name-input-field"
                    type="text"
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    placeholder="Score"
                    className="score-input-field"
                  />
                </div>
                <div className="ballot-member-container" id="three">
                  <label htmlFor="three">3. </label>
                  <input
                    className="name-input-field"
                    type="text"
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    placeholder="Score"
                    className="score-input-field"
                  />
                </div>
              </fieldset>
              <fieldset id="right-team-member">
                <legend>Negative: Team Member 2</legend>
                <div className="ballot-member-container" id="one">
                  <label htmlFor="one">1. </label>
                  <input
                    className="name-input-field"
                    type="text"
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    placeholder="Score"
                    className="score-input-field"
                  />
                </div>
                <div className="ballot-member-container" id="two">
                  <label htmlFor="two">2. </label>
                  <input
                    className="name-input-field"
                    type="text"
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    placeholder="Score"
                    className="score-input-field"
                  />
                </div>
                <div className="ballot-member-container" id="three">
                  <label htmlFor="three">3. </label>
                  <input
                    className="name-input-field"
                    type="text"
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    placeholder="Score"
                    className="score-input-field"
                  />
                </div>
              </fieldset>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default BallotEnterResults;
