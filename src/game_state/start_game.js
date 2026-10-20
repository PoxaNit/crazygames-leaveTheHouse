import game_state from './game_state.js';
import assets from './assets/assets.js';
import init_map_physics from './init_map_physics.js';
import map from './map/map.js';

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
      assets: assets,
      map: map,
      player: {
        x: 70,
        y: 80,
        width: 32,
        height: 32,
	base_velocity: 2,
        velocity: 2,
	running_velocity: 6,
	state: {
	  action: 'standing',
	  directions: []
	}
      },
      monster: {
        x: 600,
        y: 260,
        width: 32,
        height: 32,
	base_velocity: 3,
        velocity: 3,
	running_velocity: 7,
	getting_around_obstacle: {
	  active: false,
	  left: false,
	  right: false,
	  up: false,
	  down: false,
	  saved_direction: null,
	  obstacle: {
	    x: null,
	    y: null,
	    width: null,
	    height: null,
	  }
	},
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
      obstacles: [],
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

    init_map_physics();

}

export default start_game;
