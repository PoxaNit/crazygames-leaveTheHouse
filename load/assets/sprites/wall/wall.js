import sprites from '../../../../src/game_state/assets/sprites/sprites.js';

function wall () {

    return new Promise((res, rej) => {

	const wall_img = new Image();

	wall_img.src = 'assets/sprites/wall/leave_the_house_stone_wall_1.png';

	wall_img.onload = () => {

	    sprites.wall = wall_img;

	    res();

	}

	wall_img.onerror = () => rej('Error: wall sprites couldn\'t be loaded');

    });

}

export default wall;
