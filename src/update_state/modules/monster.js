import input_state from '../../input/input_state/input_state.js';
import game_state from '../../game_state/game_state.js';
import move_entity from '../../systems/movement/move_entity.js';
import entity_is_in_area from '../../systems/collisions/entity_is_in_area.js';
import get_around_obstacle from '../../systems/movement/get_around_obstacle.js';
import is_there_obstacle_in_the_way from '../../systems/collisions/is_there_obstacle_in_the_way.js';

const game_message = document.getElementById('game_message');

function monster () {


    if (game_state.monster.target_area.active) {

	let target_areaCenterX = game_state.monster.target_area.x + (game_state.monster.target_area.width / 2);
	let target_areaCenterY = game_state.monster.target_area.y + (game_state.monster.target_area.height / 2);

	let monsterCenterX = game_state.monster.x + (game_state.monster.width / 2);
	let monsterCenterY = game_state.monster.y + (game_state.monster.height / 2);

	let pace = game_state.monster.velocity;




	if (game_state.monster.state.action === 'walking' || game_state.monster.state.action === 'running') {

	    const recommended_direction = get_around_obstacle(game_state.monster);

	    if (recommended_direction) {
console.log('recommended_direction: ', recommended_direction)

		if (recommended_direction === 'left') {

		    console.log('indo para a esquerda');

		    game_state.monster.getting_around_obstacle.active = true;

		    game_state.monster.getting_around_obstacle.right = false;

		    game_state.monster.getting_around_obstacle.left = true;

		    move_entity(game_state.monster, 'left');

		}

		else if (recommended_direction === 'right') {

		    console.log('indo para a direita');

		    game_state.monster.getting_around_obstacle.active = true;

		    game_state.monster.getting_around_obstacle.left = false;

		    game_state.monster.getting_around_obstacle.right = true;

		    move_entity(game_state.monster, 'right');

		}


		if (recommended_direction === 'up') {

		    console.log('indo para a cima');

		    game_state.monster.getting_around_obstacle.active = true;

		    game_state.monster.getting_around_obstacle.down = false;

		    game_state.monster.getting_around_obstacle.up = true;

		    move_entity(game_state.monster, 'up');

		}

		else if (recommended_direction === 'down') {

		    console.log('indo para a baixo');

		    game_state.monster.getting_around_obstacle.active = true;

		    game_state.monster.getting_around_obstacle.up = false;

		    game_state.monster.getting_around_obstacle.down = true;

		    move_entity(game_state.monster, 'down');

		}

	    } else { //console.log('caiu no else, sem direção recomendada')

		game_state.monster.getting_around_obstacle = {
                    active: false, 
                    left: false, 
                    right: false, 
                    up: false, 
                    down: false
                };
	    }

//console.log('getting_around_obstacle: ', game_state.monster.getting_around_obstacle);
//console.log('target_area: ', game_state.monster.target_area);
	    if (target_areaCenterX < monsterCenterX - pace) {
//console.log('antes de esquerdaaaaa')
		if (/*!game_state.monster.getting_around_obstacle.active && */!game_state.monster.getting_around_obstacle.right) {console.log('esquerdaaaa');move_entity(game_state.monster, 'left');}

	    }

	    else if (target_areaCenterX > monsterCenterX + pace) {
//console.log('antes de direitaaaaa')

		if (/*!game_state.monster.getting_around_obstacle.active && */!game_state.monster.getting_around_obstacle.left) {console.log('direitaaaa');move_entity(game_state.monster, 'right');}

	    }


	    if (target_areaCenterY < monsterCenterY - pace) {
//console.log('antes de cimaaaaa')

		if (/*!game_state.monster.getting_around_obstacle.active && */!game_state.monster.getting_around_obstacle.down) {console.log('cimaaaa');move_entity(game_state.monster, 'up');}

	    }

	    else if (target_areaCenterY > monsterCenterY + pace) {
//console.log('antes de baixoooooo')

		if (/*!game_state.monster.getting_around_obstacle.active && */!game_state.monster.getting_around_obstacle.up) {console.log('baixooo');move_entity(game_state.monster, 'down');}

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
