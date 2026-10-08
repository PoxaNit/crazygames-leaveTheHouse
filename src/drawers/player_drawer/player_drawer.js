import game_state from '../../game_state/game_state.js';

function player_drawer () {

    const canvas = document.getElementById('gameCanvas');

    const ctx = canvas.getContext('2d');

    const x = game_state.player.x;

    const y = game_state.player.y;

    const w = game_state.player.width;

    const h = game_state.player.height;

    ctx.fillRect(x, y, h, w)

}

export default player_drawer;
