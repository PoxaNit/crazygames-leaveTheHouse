import update_state from '../update_state/update_state.js';
import draw from '../drawers/draw.js';
import game_state from '../game_state/game_state.js';

const canvas = document.getElementById('gameCanvas');

const ctx = canvas.getContext('2d');

function game_loop () {


    if (game_state.time) {
        // 1. Pega o milissegundo atual do computador
        const current_time = performance.now();

        // 2. Calcula a diferença e transforma em segundos
        game_state.time.delta_time = (current_time - game_state.time.last_frame_time) / 1000;

        // 3. Atualiza o carimbo para o próximo frame
        game_state.time.last_frame_time = current_time;
    }


    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (game_state.game_running) {

	update_state();

	draw();

    }

    requestAnimationFrame(game_loop);

}

export default game_loop;
