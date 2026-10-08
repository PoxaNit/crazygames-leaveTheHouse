import game_state from './game_state.js';

function start_game () {

    const standard_game_state = {
      game_running: true,
      player: {
        x: 0,
        y: 0,
        width: 50,
        height: 50,
        velocity: 6
      },
      monster: {
        x: 500,
        y: 200,
        width: 30,
        height: 30,
        velocity: 4,
        state: {
          action: 'walking',
          direction: null
        }
      },
      coins: [
	{
	  x: 60,
	  y: 40,
	  width:10,
	  height: 10
	},
	{
	  x: 600,
	  y: 288,
	  width:10,
	  height: 10
	},
	{
	  x: 370,
	  y: 310,
	  width:10,
	  height: 10
	}
      ],
      obstacles: [
        {
          x: 250,
          y: 250,
          width: 70,
          height: 70
        },
        {
          x: 350,
          y: 350,
          width: 50,
          height: 50
        },
        {
          x: 500,
          y: 100,
          width: 45,
          height: 45
        }
     ]
  };

    Object.assign(game_state, standard_game_state);
}

export default start_game;
