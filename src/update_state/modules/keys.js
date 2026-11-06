import game_state from '../../game_state/game_state.js';
import check_tile_collision from '../../systems/collisions/check_tile_collision.js';

function keys () {

    const keys = check_tile_collision(game_state.player, 4);

    if (keys) {

	keys.forEach(k => {

	    game_state.map.layout[k.row][k.col] = 0;

	});

    }

    const number_keys = game_state.map.layout.flat().filter(tile => tile === 4).length;

    game_state.keys = number_keys;

}

export default keys;
