import input_state from '../../input/input_state/input_state.js';
import game_state from '../../game_state/game_state.js';
import move_entity from '../../systems/movement/move_entity.js';
import entity_is_in_area from '../../systems/collisions/entity_is_in_area.js';
import get_around_obstacle from '../../systems/movement/get_around_obstacle.js';
import is_there_obstacle_in_the_way from '../../systems/collisions/is_there_obstacle_in_the_way.js';
import target_area_directions from '../../systems/movement/target_area_directions.js';

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

	    const current_obstacle = is_there_obstacle_in_the_way(game_state.monster);

	    if (current_obstacle) game_state.monster.getting_around_obstacle.obstacle = current_obstacle;


	    game_state.monster.getting_around_obstacle.left = false;
	    game_state.monster.getting_around_obstacle.right = false;
	    game_state.monster.getting_around_obstacle.up = false;
	    game_state.monster.getting_around_obstacle.down = false;


	    if (recommended_direction) {

		game_state.monster.getting_around_obstacle.active = true;

//		game_state.monster.getting_around_obstacle.saved_direction = true;

		if (recommended_direction === 'left') {console.log('movimentação recomendada: left')

		    game_state.monster.getting_around_obstacle.left = true;

		    game_state.monster.getting_around_obstacle.saved_direction = 'left';

		    move_entity(game_state.monster, 'left');

		}

		else if (recommended_direction === 'right') {console.log('movimentação recomendada: right')

		    game_state.monster.getting_around_obstacle.right = true;

		    game_state.monster.getting_around_obstacle.saved_direction = 'right';

		    move_entity(game_state.monster, 'right');

		}


		if (recommended_direction === 'up') {console.log('movimentação recomendada: up')

		    game_state.monster.getting_around_obstacle.up = true;

		    game_state.monster.getting_around_obstacle.saved_direction = 'up';

		    move_entity(game_state.monster, 'up');

		}

		else if (recommended_direction === 'down') {console.log('movimentação recomendada: down')

		    game_state.monster.getting_around_obstacle.down = true;

		    game_state.monster.getting_around_obstacle.saved_direction = 'down';

		    move_entity(game_state.monster, 'down');

		}

	    } else {

		if (game_state.monster.getting_around_obstacle.active) { console.log('else > if > obstacle.active. saved: ', game_state.monster.getting_around_obstacle.saved_direction)

		    if (game_state.monster.getting_around_obstacle.saved_direction === 'up') game_state.monster.getting_around_obstacle.up = true;

		    else if (game_state.monster.getting_around_obstacle.saved_direction === 'down') game_state.monster.getting_around_obstacle.down = true;


		    const target_directions = target_area_directions(game_state.monster);

		    const curr_ob = game_state.monster.getting_around_obstacle.obstacle;


		    if (target_directions.includes('left')) {

			if (game_state.monster.x <= (curr_ob.x + curr_ob.width)) {

			    game_state.monster.getting_around_obstacle.active = false;

			    game_state.monster.getting_around_obstacle.up = false;

			    game_state.monster.getting_around_obstacle.down = false;

                	    game_state.monster.getting_around_obstacle.saved_direction = null;

			}

		    }

		    else if (target_directions.includes('right')) {

			if ((game_state.monster.x + game_state.monster.width) >= curr_ob.x) {

			    game_state.monster.getting_around_obstacle.active = false;

			    game_state.monster.getting_around_obstacle.up = false;

			    game_state.monster.getting_around_obstacle.down = false;

                	    game_state.monster.getting_around_obstacle.saved_direction = null;

			}

		    }


		    if (target_directions.includes('up')) {

			if (game_state.monster.y <= (curr_ob.y + curr_ob.height)) {

			    game_state.monster.getting_around_obstacle.active = false;

			    game_state.monster.getting_around_obstacle.up = false;

			    game_state.monster.getting_around_obstacle.down = false;

                	    game_state.monster.getting_around_obstacle.saved_direction = null;

			}

		    }

		    else if (target_directions.includes('down')) {

			if ((game_state.monster.y + game_state.monster.height) >= curr_ob.y) {

			    game_state.monster.getting_around_obstacle.active = false;

			    game_state.monster.getting_around_obstacle.up = false;

			    game_state.monster.getting_around_obstacle.down = false;

                	    game_state.monster.getting_around_obstacle.saved_direction = null;

			}

		    }

		} else { console.log('executando else (sem obstáculo). active: ', game_state.monster.getting_around_obstacle.active)

		    if (!game_state.monster.getting_around_obstacle.active) {

		        game_state.monster.getting_around_obstacle.up = false;

		        game_state.monster.getting_around_obstacle.down = false;

		        game_state.monster.getting_around_obstacle.saved_direction = null;

		    }

	        }

	    }



	    if (target_areaCenterX < monsterCenterX - pace) { //console.log('movimentação natural: left')

		if (!(game_state.monster.getting_around_obstacle.active && game_state.monster.getting_around_obstacle.saved_direction === 'right')) move_entity(game_state.monster, 'left');

	    }

	    else if (target_areaCenterX > monsterCenterX + pace) { //console.log('movimentação natural: right')

		if (!(game_state.monster.getting_around_obstacle.active && game_state.monster.getting_around_obstacle.saved_direction === 'left')) move_entity(game_state.monster, 'right');

	    }

	    if (target_areaCenterY < monsterCenterY - pace) {


		if (!(game_state.monster.getting_around_obstacle.active && game_state.monster.getting_around_obstacle.saved_direction === 'down')) {

console.log('movimentação natural: up')
console.log('saved_direction: ', game_state.monster.getting_around_obstacle.saved_direction)

		    move_entity(game_state.monster, 'up');

		}

	    }

	    else if (target_areaCenterY > monsterCenterY + pace) {

		if (!(game_state.monster.getting_around_obstacle.active && game_state.monster.getting_around_obstacle.saved_direction === 'up')) {
//console.log('movimentação natural: down')
//console.log('saved_direction: ', game_state.monster.getting_around_obstacle.saved_direction)

			move_entity(game_state.monster, 'down');

		}

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
