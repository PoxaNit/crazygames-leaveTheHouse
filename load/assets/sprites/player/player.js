import sprites from '../../../../src/game_state/assets/sprites/sprites.js';

function player () {

    return new Promise((res, rej) => {

	const player_img = new Image();

	player_img.src = 'assets/sprites/player/leave_the_house_player_sheet_1.png';

	player_img.onload = () => {

	    sprites.player = player_img;

	    res();

	}

	player_img.onerror = () => rej('Error: player sprites couldn\'t be loaded');

    });

}

export default player;
