import game_state from '../../game_state/game_state.js';
import check_tile_collision from '../../systems/collisions/check_tile_collision.js';
import entity_is_in_area from '../../systems/collisions/entity_is_in_area.js';

const game_message = document.getElementById('game_message');

function creaky_floor () {

    let tile_size = game_state.map.tile_size;

    const creaky_floors = check_tile_collision(game_state.player, 5);

    if (creaky_floors) {

        creaky_floors.forEach(k => {

	    game_state.time.last_player_position_timer = 0;

            game_state.monster.target_area.active = true;

            game_state.monster.target_area.x = k.x;

            game_state.monster.target_area.y = k.y;

            game_state.monster.target_area.width = 32;

            game_state.monster.target_area.height = 32;

            game_state.monster.velocity = game_state.monster.running_velocity;

            game_state.monster.target_area.type = 'last_player_position';

	    game_state.monster.state.task = 'going_to_creaky_floor';

        });

    }

    if (game_state.monster.target_area.active && game_state.monster.target_area.type === 'last_player_position' && game_state.monster.state.task === 'going_to_creaky_floor') {

	let target = game_state.monster.target_area;

	if (entity_is_in_area(game_state.monster, target.x, target.y, tile_size, tile_size)) {

	    game_state.time.last_player_position_timer += game_state.time.delta_time;

	    if (game_state.time.last_player_position_timer >= 6.0) {

		game_state.monster.state.task = 'patrolling';

		game_state.monster.target_area.active = false;

	    }

	}

    }

}

export default creaky_floor;
