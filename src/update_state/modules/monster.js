import input_state from '../../input/input_state/input_state.js';
import game_state from '../../game_state/game_state.js';
import move_entity from '../../systems/movement/move_entity.js';


const game_message = document.getElementById('game_message');

function monster () {
/*
    if (input_state.p) {

	game_state.monster.state.action = 'walking';

//	game_state.monster.state.direction = 'left';

    } else {

	game_state.monster.state.action = 'standing';

	game_state.monster.state.direction = null;

    }
/*
    if (game_state.monster.state.action === 'walking') {

	switch (game_state.monster.state.direction) {

	    case 'left':
		move_entity(game_state.monster, 'left');
		break;

	    case 'down':
		move_entity(game_state.monster, 'down');
		break;
	}

    }
*/


    let playerCenterX = game_state.player.x + (game_state.player.width / 2);
    let playerCenterY = game_state.player.y + (game_state.player.height / 2);

    let monsterCenterX = game_state.monster.x + (game_state.monster.width / 2);
    let monsterCenterY = game_state.monster.y + (game_state.monster.height / 2);

    let pace = game_state.monster.velocity;

    if (game_state.monster.state.action === 'walking') {

	if (playerCenterX < monsterCenterX - pace) move_entity(game_state.monster, 'left');

	else if (playerCenterX > monsterCenterX + pace) move_entity(game_state.monster, 'right');


	if (playerCenterY < monsterCenterY - pace) move_entity(game_state.monster, 'up');

	else if (playerCenterY > monsterCenterY + pace) move_entity(game_state.monster, 'down');


/*
	if (((game_state.player.x + (game_state.player.width / 2)) < game_state.monster.x)) move_entity(game_state.monster, 'left');

	else if (((game_state.player.x + (game_state.player.width / 2)) > (game_state.monster.x + game_state.monster.width))) move_entity(game_state.monster, 'right');


	if (((game_state.player.y + (game_state.player.height / 2)) < game_state.monster.y)) move_entity(game_state.monster, 'up');

	else if (((game_state.player.y + (game_state.height / 2)) > (game_state.monster.y + game_state.monster.height))) move_entity(game_state.monster, 'down');
*/
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
