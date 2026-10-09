import game_state from '../../game_state/game_state.js';

const game_message = document.getElementById('game_message');

function bells () {

    game_state.bells.forEach(b => {

	if (
	    game_state.player.x < (b.x + b.width) &&
            game_state.player.y < (b.y + b.height) &&
            (game_state.player.x + game_state.player.width) > b.x &&
            (game_state.player.y + game_state.player.height) > b.y
        ) {

	    game_state.monster.state.task = 'chasing';

	    game_state.monster.target_area = {
		active: true,
		type: 'last_player_position',
		x: game_state.player.x,
		y: game_state.player.y,
		width: game_state.player.width,
		height: game_state.player.height
	    }

	}

    });

}

export default bells;
