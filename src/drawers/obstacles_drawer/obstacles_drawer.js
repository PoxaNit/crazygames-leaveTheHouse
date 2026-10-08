import game_state from '../../game_state/game_state.js';

const canvas = document.getElementById('gameCanvas');

const ctx = canvas.getContext('2d');

function obstacles_drawer () {

    ctx.save();

    game_state.obstacles.forEach(ob => {

	ctx.fillStyle = 'green';

	ctx.fillRect(ob.x, ob.y, ob.width, ob.height);

    });

    ctx.restore();

}

export default obstacles_drawer;
