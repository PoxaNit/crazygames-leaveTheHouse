import game_state from '../../game_state/game_state.js';

const canvas = document.getElementById('gameCanvas');

const ctx = canvas.getContext('2d');

ctx.imageSmoothingEnabled = false;

function floor_drawer () {

    const img = game_state.assets.sprites.floor;

    for (let x = 0; x < 30; x++) {
        for (let y = 0; y < 17; y++) {
            ctx.drawImage(img, x * 32, y * 32, 32, 32);
        }
    }

}

export default floor_drawer;
