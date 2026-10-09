import input_state from '../../input/input_state/input_state.js';
import game_state from '../../game_state/game_state.js';
import move_entity from '../../systems/movement/move_entity.js';
import entity_is_in_area from '../../systems/collisions/entity_is_in_area.js';
import update_next_move from '../../systems/movement/update_next_move.js';
import is_there_obstacle_in_the_way from '../../systems/collisions/is_there_obstacle_in_the_way.js';

const game_message = document.getElementById('game_message');

function monster () {

    update_next_move(game_state.monster);

    if (game_state.monster.target_area.active) {

	let next_moveCenterX = game_state.monster.target_area.x + (game_state.monster.target_area.width / 2);
	let next_moveCenterY = game_state.monster.target_area.y + (game_state.monster.target_area.height / 2);

	let monsterCenterX = game_state.monster.x + (game_state.monster.width / 2);
	let monsterCenterY = game_state.monster.y + (game_state.monster.height / 2);

	let pace = game_state.monster.velocity;

	if (is_there_obstacle_in_the_way(game_state.monster)) console.log('obstáculo!');

	if (game_state.monster.state.action === 'walking' || game_state.monster.state.action === 'running') {
//console.log('centers: ', next_moveCenterX, next_moveCenterY, monsterCenterX, monsterCenterY)

	    if (next_moveCenterX < monsterCenterX - pace) {console.log('vá para esquerda');move_entity(game_state.monster, 'left');}

	    else if (next_moveCenterX > monsterCenterX + pace) {console.log('vá para direita');move_entity(game_state.monster, 'right');}


	    if (next_moveCenterY < monsterCenterY - pace) {console.log('vá para cima');move_entity(game_state.monster, 'up');}

	    else if (next_moveCenterY > monsterCenterY + pace) {console.log('vá para baixo');move_entity(game_state.monster, 'down');}

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
