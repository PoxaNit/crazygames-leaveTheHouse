import game_state from '../../game_state/game_state.js';
import entity_is_in_area from '../collisions/entity_is_in_area.js';

function patrol_tiles_monster_is_not_in () {

    let tile_size = game_state.map.tile_size;

    return game_state.monster.patrol_tiles.filter(pt => !entity_is_in_area(game_state.monster, pt.x, pt.y, tile_size, tile_size));

}

export default patrol_tiles_monster_is_not_in;
