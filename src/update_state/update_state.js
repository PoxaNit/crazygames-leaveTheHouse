import player from './modules/player.js';
import monster from './modules/monster.js';
import coins from './modules/coins.js';

function update_state () {

    coins();

    monster();

    player();

}

export default update_state;
