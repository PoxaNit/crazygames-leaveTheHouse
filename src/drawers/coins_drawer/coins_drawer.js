import game_state from '../../game_state/game_state.js';

const canvas = document.getElementById('gameCanvas');

const ctx = canvas.getContext('2d');

function coins_drawer () {

    ctx.save();

    ctx.fillStyle = 'yellow';

    game_state.coins.forEach(c => {

	const x = c.x;

	const y = c.y;

	const w = c.width;

	const h = c.height;


	ctx.fillRect(x, y, w, h);

    });

    ctx.restore();

}

export default coins_drawer;
