import input_state from '../../input/input_state/input_state.js';
import game_state from '../../game_state/game_state.js';
import move_entity from '../../systems/movement/move_entity.js';


const game_message = document.getElementById('game_message');

function door () {

    if (
	game_state.door.x < (game_state.player.x + game_state.player.width) &&
	game_state.door.y < (game_state.player.y + game_state.player.height) &&
	(game_state.door.x + game_state.door.width) > game_state.player.x &&
	(game_state.door.y + game_state.door.height) > game_state.player.y
    ) {

	if (game_state.door.active) {

	    game_state.game_running = false;

	    game_message.textContent = 'Victory!';

	}

    };


}

export default door;
