import game_state from '../../../../src/game_state/game_state.js';

function floor () {

    return new Promise((res, rej) => {

	const floor_img = new Image();

	floor_img.src = 'assets/sprites/floor/leave_the_house_wooden_floor_1.png';

	floor_img.onload = () => {

	    game_state.assets.sprites.floor = floor_img;

	    res();

	}

	floor_img.onerror = () => rej('Error: floor sprites couldn\'t be loaded');

    });

}

export default floor;
