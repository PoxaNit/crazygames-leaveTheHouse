import game_state from '../../../../src/game_state/game_state.js';

function wall () {

    return new Promise((res, rej) => {

	const wall_img = new Image();

	wall_img.src = 'assets/sprites/wall/leave_the_house_stone_wall_1.png';

	wall_img.onload = () => {

	    game_state.assets.sprites.wall = wall_img;

	    res();

	}

	wall_img.onerror = () => rej('Error: floor sprites couldn\'t be loaded');

    });

}

export default wall;
