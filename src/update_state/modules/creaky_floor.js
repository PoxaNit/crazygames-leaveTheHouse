import game_state from '../../game_state/game_state.js';
import check_tile_collision from '../../systems/collisions/check_tile_collision.js';

const game_message = document.getElementById('game_message');

function creaky_floor () {

    const creaky_floors = check_tile_collision(game_state.player, 5);

    if (creaky_floors) {

        creaky_floors.forEach(k => {

            game_state.monster.target_area.active = true;

            game_state.monster.target_area.x = k.x;

            game_state.monster.target_area.y = k.y;

            game_state.monster.target_area.width = 32;

            game_state.monster.target_area.height = 32;

            game_state.monster.target_area.type = 'last_player_position';

        });

    }

}

export default creaky_floor;
