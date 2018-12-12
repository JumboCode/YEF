import React, { Component } from 'react';
import './styles.css';

class BallotEnterResults extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { tournament, round, matchup, oppTeam, propTeam } = this.props;
    console.log(this.props);
    return (
      <div>
        <h1>{`${matchup.prop_name} vs ${matchup.opp_name}`}</h1>
        {/*<p>Room # and Time</p>*/}
        <p>{`Round # ${round.round}`}</p>

        <form autoComplete="off">
          <div id="motion-container" className="big-container">
            <h2 className="big-container-title"> Motion</h2>
            <div className="big-container-wo-title">
              <div
                className="motion-option-container"
                style={{ display: 'flex' }}
              >
                <p className="motion-option-label">Motion:</p>
                <p id="motion-chosen">{round.statement}</p>
              </div>
              {/*<div className="motion-option-container">
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
    </div>*/}
            </div>
          </div>
          <div id="ballot-container" className="big-container">
            <h2 className="big-container-title"> Ballot</h2>
            <div
              className="big-container-wo-title"
              id="ballot-options-container"
            >
              <fieldset id="left-team-member">
                <legend>Proposition</legend>
                <div className="ballot-member-container" id="one">
                  <label htmlFor="one">{propTeam.members[0].name} </label>
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
                  <label htmlFor="two">{propTeam.members[1].name} </label>
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
                  <label htmlFor="three">{propTeam.members[2].name} </label>
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
                <legend>Opposition</legend>
                <div className="ballot-member-container" id="one">
                  <label htmlFor="one">{oppTeam.members[0].name} </label>
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
                  <label htmlFor="two">{oppTeam.members[1].name} </label>
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
                  <label htmlFor="three">{oppTeam.members[2].name} </label>
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
