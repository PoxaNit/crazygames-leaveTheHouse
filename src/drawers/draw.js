import map_drawer from './map_drawer/map_drawer.js';
import floor from './floor_drawer/floor_drawer.js';
import player_draw from './player_drawer/player_drawer.js';
import obstacles_drawer from './obstacles_drawer/obstacles_drawer.js';
import monster_drawer from './monster_drawer/monster_drawer.js';
import door_drawer from './door_drawer/door_drawer.js';
import coins_drawer from './coins_drawer/coins_drawer.js';
import bells_drawer from './bells_drawer/bells_drawer.js';

function draw () {

//    floor();

//    obstacles_drawer();

    map_drawer();

    door_drawer();

    coins_drawer();

    bells_drawer();

    monster_drawer();

    player_draw();

}

export default draw;
