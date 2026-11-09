import sprites from '../../../../../src/game_state/assets/sprites/sprites.js';

function cactus () {

    return new Promise((res, rej) => {

        const cactus_img = new Image();

        cactus_img.src = '../../../../../assets/sprites/plants/cactus/leave_the_house_furniture_cactus_1.png';

        cactus_img.onload = () => {

            sprites.cactus = cactus_img;

            res();

        }

        cactus_img.onerror = () => rej('Error: cactus sprites couldn\'t be loaded');

    });

}

export default cactus;
