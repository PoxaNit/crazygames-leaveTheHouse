import sprites from '../../../../src/game_state/assets/sprites/sprites.js';

function chair () {

    return new Promise((res, rej) => {

        const chair_img = new Image();

        chair_img.src = 'assets/sprites/chair/leave_the_house_chair_sheet_1.png';

        chair_img.onload = () => {

            sprites.chair = chair_img;

            res();

        }

        chair_img.onerror = () => rej('Error: chair sprites couldn\'t be loaded');

    });

}

export default chair;
