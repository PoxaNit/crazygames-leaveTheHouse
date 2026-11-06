import player from './modules/player.js';
import monster from './modules/monster.js';
import keys from './modules/keys.js';
import creaky_floor from './modules/creaky_floor.js';
import door from './modules/door.js';
import patrol_areas from './modules/patrol_areas.js';
import update_camera from '../../src/systems/camera/update_camera.js';

function update_state () {

    door();

    keys();

    creaky_floor();

    monster();

//    patrol_areas();

    player();

    update_camera();

}

export default update_state;
