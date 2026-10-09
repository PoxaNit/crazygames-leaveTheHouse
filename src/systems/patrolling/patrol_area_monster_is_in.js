import game_state from '../../game_state/game_state.js';
import entity_is_in_area from '../collisions/entity_is_in_area.js';

function patrol_area_monster_is_in () {

    return game_state.monster.patrol_areas.find(pa => entity_is_in_area(game_state.monster, pa.x, pa.y, pa.width, pa.height));

}

export default patrol_area_monster_is_in;
