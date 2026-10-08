import input_state from '../../input/input_state/input_state.js';
import game_state from '../../game_state/game_state.js';
import move_entity from '../../systems/movement/move_entity.js';

function player () {


    if (input_state.left_arrow) move_entity(game_state.player, 'left');


    if (input_state.up_arrow) move_entity(game_state.player, 'up');


    if (input_state.right_arrow) move_entity(game_state.player, 'right');


    if (input_state.down_arrow) move_entity(game_state.player, 'down');

}

export default player;
