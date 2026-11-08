import game_state from './game_state.js';
import assets from './assets/assets.js';
import init_map_physics from './init_map_physics.js';
import map from './map/map.js';

const game_message = document.getElementById('game_message');

const canvas = document.getElementById('gameCanvas');

function start_game () {

    game_message.textContent = '';

    const map_copy = structuredClone(map);

    const standard_game_state = {
      game_running: true,
      solid_tiles: [1, 6, 7], // to define obstacles
      time: {
	last_frame_time: performance.now(),
	delta_time: 0,
	patrol_timer: 0,
	last_player_position_timer: 0
      },
      assets: assets,
      map: map_copy,
      player: {
        x: 32 * 3,
        y: 32 * 3,
        width: 32,
        height: 32,
	base_velocity: 1.5,
        velocity: 1.5,
	running_velocity: 4,
	state: {
	  action: 'standing',
	  directions: []
	}
      },
      monster: {
        x: 32 * 58,
        y: 32 * 16,
        width: 32,
        height: 32,
	base_velocity: 3,
        velocity: 3,
	running_velocity: 6,
	movement_type: 'pathfinding', // defines how to move entity on the map. values: [pathfinding, contextual_navigation]
	patrol_tiles: null, // [{row: 0, col: 0, x: 0, y: 0}, ...]
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
	  },
	  action_type: null // seeking_entry / contouring_perimeter / escaping_compartiment
	},
	target_area: {
	  active:  false,
	  type: '',
	  x: 0,
	  y: 0,
	  width: 0,
	  height: 0,
	  path: []
	},
        state: {
          action: 'walking',
          direction: null,
	  task: 'patrolling'
        }
      },
      keys: null,
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
