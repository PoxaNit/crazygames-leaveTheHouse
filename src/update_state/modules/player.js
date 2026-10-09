import input_state from '../../input/input_state/input_state.js';
import game_state from '../../game_state/game_state.js';
import move_entity from '../../systems/movement/move_entity.js';

function player () {




    // changing player state
    if (input_state.left_arrow || input_state.up_arrow || input_state.right_arrow || input_state.down_arrow) {



	// defines the directions state

	if (input_state.left_arrow && !game_state.player.state.directions.includes('left') && !game_state.player.state.directions.includes('right')) {

	    game_state.player.state.directions.push('left');


	    // prevents the player move to two opposite directions

	    const index_right = game_state.player.state.directions.indexOf('right');

	    if (index_right !== -1) game_state.player.state.directions.splice(index_right, 1);

	}

	else if (input_state.right_arrow && !game_state.player.state.directions.includes('right') && !game_state.player.state.directions.includes('left')) {

	    game_state.player.state.directions.push('right');

	    const index_left = game_state.player.state.directions.indexOf('left');

	    if (index_left !== -1) game_state.player.state.directions.splice(index_left, 1);

	}

	if (input_state.up_arrow && !game_state.player.state.directions.includes('up') && !game_state.player.state.directions.includes('down')) {

	    game_state.player.state.directions.push('up');

	    const index_down = game_state.player.state.directions.indexOf('down');

	    if (index_down !== -1) game_state.player.state.directions.splice(index_down, 1);

	}

	else if (input_state.down_arrow && !game_state.player.state.directions.includes('down') && !game_state.player.state.directions.includes('up')) {

	    game_state.player.state.directions.push('down');

	    const index_up = game_state.player.state.directions.indexOf('up');

	    if (index_up !== -1) game_state.player.state.directions.splice(index_up, 1);


	}



	// verifies if keys are not pressed, then remove the direction from the state

	if (!input_state.left_arrow) {

	    const index_left = game_state.player.state.directions.indexOf('left');

	    if (index_left !== -1) game_state.player.state.directions.splice(index_left, 1);

	}

	if (!input_state.right_arrow) {

	    const index_right = game_state.player.state.directions.indexOf('right');

	    if (index_right !== -1) game_state.player.state.directions.splice(index_right, 1);

	}

	if (!input_state.up_arrow) {

	    const index_up = game_state.player.state.directions.indexOf('up');

	    if (index_up !== -1) game_state.player.state.directions.splice(index_up, 1);

	}

	if (!input_state.down_arrow) {

	    const index_down = game_state.player.state.directions.indexOf('down');

	    if (index_down !== -1) game_state.player.state.directions.splice(index_down, 1);

	}



	// defines player state action and velocity

	if (!input_state.r) {game_state.player.state.action = 'walking'; game_state.player.velocity = game_state.player.base_velocity}

	else {game_state.player.state.action = 'running'; game_state.player.velocity = game_state.player.running_velocity}

    } else {

	game_state.player.state = {action: 'standing', directions: []};

    }



    // making monster go after the player
    if (game_state.player.state.action === 'running') {

	game_state.monster.state.task = 'chasing';

	game_state.monster.target_area = {
          active: true,
	  type: 'player',
          x: game_state.player.x,
          y: game_state.player.y,
	  width: game_state.player.width,
	  height: game_state.player.height
        }

    } else {

	if (game_state.monster.target_area.type === 'player') game_state.monster.target_area = {
            active: true,
	    type: 'last_player_position',
            x: game_state.player.x,
            y: game_state.player.y,
	    width: game_state.player.width,
	    height: game_state.player.height
	};

    }




    // moving player
    if (game_state.player.state.action === 'walking' || game_state.player.state.action === 'running') {

	if (game_state.player.state.directions.includes('left')) move_entity(game_state.player, 'left');

	else if (game_state.player.state.directions.includes('right')) move_entity(game_state.player, 'right');


	if (game_state.player.state.directions.includes('up')) move_entity(game_state.player, 'up');

	else if (game_state.player.state.directions.includes('down')) move_entity(game_state.player, 'down');

    }




}

export default player;
