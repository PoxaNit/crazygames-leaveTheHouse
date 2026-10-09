import game_state from '../../game_state/game_state.js';
import entity_is_in_area from '../collisions/entity_is_in_area.js';

function patrol_areas_monster_is_not_in () {

    return game_state.monster.patrol_areas.filter(pa => !entity_is_in_area(game_state.monster, pa.x, pa.y, pa.width, pa.height));

}

export default patrol_areas_monster_is_not_in;
