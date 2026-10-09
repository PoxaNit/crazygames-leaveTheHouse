import game_state from './game_state.js';
import init_pathfinding from './init_pathfinding.js';

const game_message = document.getElementById('game_message');

const canvas = document.getElementById('gameCanvas');

function start_game () {

    game_message.textContent = '';

    const standard_game_state = {
      game_running: true,
      time: {
	last_frame_time: performance.now(),
	delta_time: 0,
	patrol_timer: 0
      },
      pathfinding: {
        nodeSize: 32, // Tamanho de cada célula do grid em pixels
        grid: []      // Vai ser preenchido com a matriz de nós do mapa
      },
      player: {
        x: 0,
        y: 0,
        width: 50,
        height: 50,
	base_velocity: 2,
        velocity: 2,
	running_velocity: 6,
	state: {
	  action: 'standing',
	  directions: []
	}
      },
      monster: {
        x: 500,
        y: 200,
        width: 30,
        height: 30,
	nase_velocity: 3,
        velocity: 3,
	running_velocity: 7,
	patrol_areas: [
	  {
	    monster_is_in: false,
	    x: 0,
	    y: 0,
	    width: 30,
	    height: 30
	  },
	  {
	    monster_is_in: false,
	    x: 0,
	    y: 420,
	    width: 30,
	    height: 30
	  },
	  {
	    monster_is_in: false,
	    x: 770,
	    y: 0,
	    width: 30,
	    height: 30
	  },
	  {
	    monster_is_in: false,
	    x: 770,
	    y: 420,
	    width: 30,
	    height: 30
	  }
	],
	target_area: {
	  active:  false,
	  type: '',
	  x: 0,
	  y: 0,
	  width: 0,
	  height: 0,
	  next_move: { // next area the monster has to go in order to get closer to the target area (final destiny)
	    x: 0,
	    y: 0,
	    width: 0,
	    height: 0
	  }
	},
        state: {
          action: 'walking',
          direction: null,
	  task: 'patrolling'
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
      ],
      bells: [
	{
	  x: 466,
	  y: 200,
	  width: 15,
	  height: 15
	}
      ],
      door: {
	active: false,
	x: 0,
	y: 0,
	width: 55,
	height: 55
      }
  };

    Object.assign(game_state, standard_game_state);

    init_pathfinding(canvas.width, canvas.height);

}

export default start_game;
