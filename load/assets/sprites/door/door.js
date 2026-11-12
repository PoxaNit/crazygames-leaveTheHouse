import sprites from '../../../../src/game_state/assets/sprites/sprites.js';

function door () {

    return new Promise((res, rej) => {

        const door_img = new Image();

        door_img.src = 'assets/sprites/door/leave_the_house_door_sheet_1.png';

        door_img.onload = () => {

            sprites.door = door_img;

            res();

        }

        door_img.onerror = () => rej('Error: door sprites couldn\'t be loaded');

    });

}

export default door;
