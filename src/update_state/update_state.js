import player from './modules/player.js';
import monster from './modules/monster.js';
import coins from './modules/coins.js';
import bells from './modules/bells.js';
import door from './modules/door.js';
import patrol_areas from './modules/patrol_areas.js';
import update_camera from '../../src/systems/camera/update_camera.js';

function update_state () {

//    door();

  //  coins();

    //bells();

    //monster();

    patrol_areas();

    player();

    update_camera();

}

export default update_state;
