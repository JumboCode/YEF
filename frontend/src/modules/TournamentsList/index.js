import React, { Component } from 'react';
import './styles.css';

class TournamentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:8000/tournaments/')
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            items: result,
            isLoaded: true
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error: true
          });
        }
      );
  }

  checkDate(t_date){
      for(var i = 0; i < t_date.length; i++)
      { t_date[i] = parseInt(t_date[i], 10);
      }
      var today = new Date();
      var date = today.getDate();
      var month = today.getMonth() + 1;
      var year  = today.getFullYear();
      if( year == t_date[0]){
        if(month == t_date[1]){
          if(date <= t_date[2] ){return 1;}
          else{return 0;}
        }
        else if(month < t_date[1]){return 1;}
      }
      else if(year < t_date[0]){return 1}
      return 0;
  }

  render() {
      var monthList = {"1":"Jan","2":"Feb","3":"Mar","4":"Apr","5":"May","6":"Jun","7":"Jul",
      "8":"Aug","9":"Sept","10":"Oct","11":"Nov","12":"Dec"};
      if (this.state.isLoaded && !this.state.error) {
        var presentTlist  = [];
        var pastTlist = [];
        this.state.items.forEach((item) => {
          var e_date = item.end_date.split("-");
          var s_date = item.start_date.split("-");
          item["date"] = {date:s_date[2], month:monthList[s_date[1]]}
          var flag_present = this.checkDate(e_date);
          if(flag_present){ presentTlist.push(item); }
          else{ pastTlist.push(item); }
        });

        return (
          <div id= "Tlist">
            <div className = "tournament_list_mainbox"> </div>

            <div id = "pTlist">
                <h3 className="titles"> Upcoming Tournaments </h3>
                <hr className="orange_line" />
                  {
                    presentTlist.map(item => (
                      <div className="tournament_div" key={item.id}>
                        <div className = "present_date_box">
                          <p className="month"> {item.date.month} </p>
                          <p className="date"> {item.date.date} </p>
                        </div>
                        <div className= "current_tournament_box">
                          <p className="tournament_name"> {item.name} </p>
                          <p className= "location"> {item.location} </p>
                        </div>
                      </div>

                    ))
                  }
                </div>

            <div id="cTlist">
              <h3 className="titles"> Past Tournaments </h3>
              <hr className="orange_line" />
              {
                pastTlist.map((item) => (
                <div className="tournament_div" key={item.id}>
                <div className = "past_date_box">
                  <p className="month"> {item.date.month} </p>
                  <p className="date"> {item.date.date} </p>
                </div>
                <div className= "past_tournament_box">
                  <p className="tournament_name"> {item.name} </p>
                  <p className= "location"> {item.location} </p>
                </div>
              </div>
              ))

              }
            </div>
          </div>
        );
      } else {
        return 'Loading...';
      }
    }
}
export default TournamentList;
