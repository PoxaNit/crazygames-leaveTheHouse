import input_state from '../../input/input_state/input_state.js';
import game_state from '../../game_state/game_state.js';
import entity_is_in_area from '../../systems/collisions/entity_is_in_area.js';
import process_movement from '../../systems/movement/process_movement.js';

const game_message = document.getElementById('game_message');

function monster () {


    process_movement(game_state.monster);


    if (game_state.monster.state.task === 'chasing' && game_state.monster.target_area.type === 'last_player_position') {

        const x = game_state.monster.target_area.x;

        const y = game_state.monster.target_area.y;

        const w = game_state.monster.target_area.width;

        const h = game_state.monster.target_area.height;

        if (entity_is_in_area(game_state.monster, x, y, w, h)) {

            game_state.monster.state.task = 'patrolling';

            game_state.monster.target_area.active = false;

	    game_state.time.patrol_timer = 0;

        }

    }

    if (
	game_state.monster.x < (game_state.player.x + game_state.player.width) &&
	game_state.monster.y < (game_state.player.y + game_state.player.height) &&
	(game_state.monster.x + game_state.monster.width) > game_state.player.x &&
	(game_state.monster.y + game_state.monster.height) > game_state.player.y
    ) {

	game_state.game_running = false;

	game_message.textContent = 'Game Over!';

    };

}

export default monster;
