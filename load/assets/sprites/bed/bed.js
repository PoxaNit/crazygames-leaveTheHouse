import sprites from '../../../../src/game_state/assets/sprites/sprites.js';

function bed () {

    return new Promise((res, rej) => {

	const bed_img = new Image();

	bed_img.src = 'assets/sprites/bed/leave_the_house_bed_sheet_1.png';

	bed_img.onload = () => {

	    sprites.bed = bed_img;

	    res();

	}

	bed_img.onerror = () => rej('Error: bed sprites couldn\'t be loaded');

    });

}

export default bed;
