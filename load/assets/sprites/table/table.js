import sprites from '../../../../src/game_state/assets/sprites/sprites.js';

function table () {

    return new Promise((res, rej) => {

        const table_img = new Image();

        table_img.src = 'assets/sprites/table/leave_the_house_table_sheet_1.png';

        table_img.onload = () => {

            sprites.table = table_img;

            res();

        }

        table_img.onerror = () => rej('Error: table sprites couldn\'t be loaded');

    });

}

export default table;
