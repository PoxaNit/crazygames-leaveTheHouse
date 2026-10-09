import game_state from '../../game_state/game_state.js';

const canvas = document.getElementById('gameCanvas');

const ctx = canvas.getContext('2d');

function bells_drawer () {

    ctx.save();

    ctx.fillStyle = 'blue';

    game_state.bells.forEach(b => {

	const x = b.x;

	const y = b.y;

	const w = b.width;

	const h = b.height;


	ctx.fillRect(x, y, w, h);

    });

    ctx.restore();

}

export default bells_drawer;
