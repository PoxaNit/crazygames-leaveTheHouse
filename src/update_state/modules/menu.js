import game_state from '../../game_state/game_state.js';

const main_menu = document.getElementById('main-menu');

function menu () {

    if (game_state.match_status === 'menu') main_menu.style.display = 'flex';

    else main_menu.style.display = 'none';

}

export default menu;
