import game_state from '../../game_state/game_state.js';

const game_message = document.getElementById('game_message');

function coins () {

    let arrCopy = [...game_state.coins];

    let collectedAny = false;

    game_state.coins.forEach((c) => {

	if (
	    game_state.player.x < (c.x + c.width) &&
            game_state.player.y < (c.y + c.height) &&
            (game_state.player.x + game_state.player.width) > c.x &&
            (game_state.player.y + game_state.player.height) > c.y
        ) {

	    const index = arrCopy.indexOf(c);

	    if (!(index === -1)) {

		arrCopy.splice(index, 1);

		collectedAny = true;

	    }

	}

    });

    if (collectedAny) game_state.coins = arrCopy;

    if (!game_state.coins.length) {

	game_state.door.active = true;

    }

}

export default coins;
