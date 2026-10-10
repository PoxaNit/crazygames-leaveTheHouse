import input_state from '../../input/input_state/input_state.js';
import game_state from '../../game_state/game_state.js';
import move_entity from '../../systems/movement/move_entity.js';
import entity_is_in_area from '../../systems/collisions/entity_is_in_area.js';
import get_around_obstacle from '../../systems/movement/get_around_obstacle.js';

const game_message = document.getElementById('game_message');

function monster () {


    if (game_state.monster.target_area.active) {

	let next_moveCenterX = game_state.monster.target_area.x + (game_state.monster.target_area.width / 2);
	let next_moveCenterY = game_state.monster.target_area.y + (game_state.monster.target_area.height / 2);

	let monsterCenterX = game_state.monster.x + (game_state.monster.width / 2);
	let monsterCenterY = game_state.monster.y + (game_state.monster.height / 2);

	let pace = game_state.monster.velocity;




	if (game_state.monster.state.action === 'walking' || game_state.monster.state.action === 'running') {

	    const recommended_direction = get_around_obstacle(game_state.monster);

	    if (recommended_direction) {
console.log('recommended_direction: ', recommended_direction)

		if (recommended_direction === 'left') {console.log('indo para a esquerda'); move_entity(game_state.monster, 'left');}

		else if (recommended_direction === 'right') {console.log('indo para a direita');move_entity(game_state.monster, 'right');}


		if (recommended_direction === 'up') {console.log('indo para a cima');move_entity(game_state.monster, 'up');}

		else if (recommended_direction === 'down') {console.log('indo para a baixo');move_entity(game_state.monster, 'down');}

	    }

	    if (next_moveCenterX < monsterCenterX - pace) {

		if (recommended_direction !== 'right') {console.log('esquerdaaaa');move_entity(game_state.monster, 'left');}

	    }

	    else if (next_moveCenterX > monsterCenterX + pace) {

		if (recommended_direction !== 'left') {console.log('direitaaaa');move_entity(game_state.monster, 'right');}

	    }


	    if (next_moveCenterY < monsterCenterY - pace) {

		if (recommended_direction !== 'down') {console.log('cimaaaa');move_entity(game_state.monster, 'up');}

	    }

	    else if (next_moveCenterY > monsterCenterY + pace) {

		if (recommended_direction !== 'up') {console.log('baixooo');move_entity(game_state.monster, 'down');}

	    }

	}


    }


    if (game_state.monster.state.task === 'chasing' && game_state.monster.target_area.type === 'last_player_position') {

        const x = game_state.monster.target_area.x;

        const y = game_state.monster.target_area.y;

        const w = game_state.monster.target_area.width;

        const h = game_state.monster.target_area.height;

        if (entity_is_in_area(game_state.monster, x, y, w, h)) {

            game_state.monster.state.task = 'patrolling';

            game_state.monster.target_area.active = false;

	    game_state.time.patrol_timer = 0;

        }

    }

    if (
	game_state.monster.x < (game_state.player.x + game_state.player.width) &&
	game_state.monster.y < (game_state.player.y + game_state.player.height) &&
	(game_state.monster.x + game_state.monster.width) > game_state.player.x &&
	(game_state.monster.y + game_state.monster.height) > game_state.player.y
    ) {

	game_state.game_running = false;

	game_message.textContent = 'Game Over!';

    };


}

export default monster;
