import update_state from '../update_state/update_state.js';
import draw from '../drawers/draw.js';
import game_state from '../game_state/game_state.js';

const canvas = document.getElementById('gameCanvas');

const ctx = canvas.getContext('2d');

function game_loop () {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (game_state.game_running) {

	update_state();

	draw();

    }

    requestAnimationFrame(game_loop);

}

export default game_loop;
