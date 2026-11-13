import sprites from '../../../../src/game_state/assets/sprites/sprites.js';

function amanda () {

    return new Promise((res, rej) => {

	const amanda_img = new Image();

	amanda_img.src = 'assets/sprites/amanda/leave_the_house_amanda_sheet_1.png';

	amanda_img.onload = () => {

	    sprites.amanda = amanda_img;

	    res();

	}

	amanda_img.onerror = () => rej('Error: amanda sprites couldn\'t be loaded');

    });

}

export default amanda;
