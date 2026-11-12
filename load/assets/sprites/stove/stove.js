import sprites from '../../../../src/game_state/assets/sprites/sprites.js';

function stove () {

    return new Promise((res, rej) => {

        const stove_img = new Image();

        stove_img.src = 'assets/sprites/stove/leave_the_house_stove_sheet_1.png';

        stove_img.onload = () => {

            sprites.stove = stove_img;

            res();

        }

        stove_img.onerror = () => rej('Error: stove sprites couldn\'t be loaded');

    });

}

export default stove;
