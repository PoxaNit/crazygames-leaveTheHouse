import sprites from '../../../../src/game_state/assets/sprites/sprites.js';

function carpet () {

    return new Promise((res, rej) => {

        const carpet_img = new Image();

        carpet_img.src = 'assets/sprites/carpet/leave_the_house_carpet_sheet_1.png';

        carpet_img.onload = () => {

            sprites.carpet = carpet_img;

            res();

        }

        carpet_img.onerror = () => rej('Error: carpet sprites couldn\'t be loaded');

    });

}

export default carpet;
