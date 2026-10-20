import sprites from '../../../../src/game_state/assets/sprites/sprites.js';

function key () {

    return new Promise((res, rej) => {

	const key_img = new Image();

	key_img.src = 'assets/sprites/key/leave_the_house_key_1.png';

	key_img.onload = () => {

	    sprites.key = key_img;

	    res();

	}

	key_img.onerror = () => rej('Error: key sprites couldn\'t be loaded');

    });

}

export default key;
