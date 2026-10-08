import game_state from '../game_state/game_state.js';
import start_game from '../game_state/start_game.js';
import input_state from './input_state/input_state.js';

function bind_inputs () {

    document.addEventListener('keydown', e => {

	if (e.key === 'ArrowUp' || e.key === 'Up') input_state.up_arrow = true;
	if (e.key === 'ArrowDown' || e.key === 'Down') input_state.down_arrow = true;
	if (e.key === 'ArrowLeft' || e.key === 'Left') input_state.left_arrow = true;
	if (e.key === 'ArrowRight' || e.key === 'Right') input_state.right_arrow = true;

	if (e.key === 'p') input_state.p = true;

	if (e.key === 'e' && !game_state.game_running) start_game(); // restarts the game when it's game over

    });

    document.addEventListener('keyup', e => {

	if (e.key === 'ArrowUp' || e.key === 'Up') input_state.up_arrow = false;
	if (e.key === 'ArrowDown' || e.key === 'Down') input_state.down_arrow = false;
	if (e.key === 'ArrowLeft' || e.key === 'Left') input_state.left_arrow = false;
	if (e.key === 'ArrowRight' || e.key === 'Right') input_state.right_arrow = false;

	if (e.key === 'p') input_state.p = false;

    });


}

export default bind_inputs;
