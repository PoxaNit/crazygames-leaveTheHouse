import game_state from '../../game_state/game_state.js';
import check_tile_collision from '../../systems/collisions/check_tile_collision.js';

const game_message = document.getElementById('game_message');

function door () {

    let player = game_state.player;

    let layout = game_state.map.layout;

    let solid_tiles = game_state.solid_tiles;

    if (game_state.keys === 0 && (solid_tiles.includes(6) || solid_tiles.includes(7))) {

        for (let r = 0; r < layout.length; r++) {

	    for (let c = 0; c < layout[r].length; c++) {

	        if (layout[r][c] === 6) layout[r][c] = 8;

	        if (layout[r][c] === 7) layout[r][c] = 9;

	    }

        }

    }

    if (
	check_tile_collision(player, 8) ||
	check_tile_collision(player, 9)
    ) {

	game_state.game_running = false;

	game_message.textContent = 'Victory!';

    };


}

export default door;
