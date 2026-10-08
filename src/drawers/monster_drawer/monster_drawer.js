import game_state from '../../game_state/game_state.js';

const canvas = document.getElementById('gameCanvas');

const ctx = canvas.getContext('2d');

function monster_drawer () {

    const x = game_state.monster.x;

    const y = game_state.monster.y;

    const w = game_state.monster.width;

    const h = game_state.monster.height;

    ctx.save();

    ctx.fillStyle = 'red';

    ctx.fillRect(x, y, w, h);

    ctx.restore();

}

export default monster_drawer;
