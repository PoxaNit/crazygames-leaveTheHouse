import game_state from '../../game_state/game_state.js';

const canvas = document.getElementById('gameCanvas');

const ctx = canvas.getContext('2d');

function door_drawer () {

    if (!game_state.door.active) return;

    const x = game_state.door.x;

    const y = game_state.door.y;

    const w = game_state.door.width;

    const h = game_state.door.height;

    ctx.save();

    ctx.fillStyle = 'white';

    ctx.fillRect(x, y, w, h);

    ctx.restore();

}

export default door_drawer;
