class matchupsTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const data = [
      {
        id: '1',
        'round number': '1',
        team1Name: 'teamA',
        team2Name: 'teamB',
        judge: 'judge1',
        room: 'SEC1'
      },
      {
        id: '2',
        'round number': '2',
        team1Name: 'teamC',
        team2Name: 'teamD',
        judge: 'judge2',
        room: 'SEC2'
      },
      {
        id: '3',
        'round number': '3',
        team1Name: 'teamE',
        team2Name: 'teamF',
        judge: 'judge3',
        room: 'SEC3'
      },
      {
        id: '4',
        'round number': '4',
        team1Name: 'teamG',
        team2Name: 'teamH',
        judge: 'judge4',
        room: 'SEC4'
      },
      {
        id: '5',
        'round number': '5',
        team1Name: 'teamH',
        team2Name: 'teamI',
        judge: 'judge5',
        room: 'SEC5'
      },
      {
        id: '6',
        'round number': '6',
        team1Name: 'teamJ',
        team2Name: 'teamK',
        judge: 'judge6',
        room: 'SEC6'
      },
      {
        id: '7',
        'round number': '7',
        team1Name: 'teamL',
        team2Name: 'teamM',
        judge: 'judge7',
        room: 'SEC7'
      }
    ];
    const listItems = data.map(d => <li key={d.id}>{d.id}</li>);

    return <div>{listItems}</div>;
  }
}
