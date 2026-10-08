import game_state from '../../game_state/game_state.js';

function obstacles_collision (futureEntity) {


    return game_state.obstacles.some(ob => {

	return (
	    futureEntity.x + futureEntity.width > ob.x &&
            futureEntity.x < ob.x + ob.width &&
            futureEntity.y + futureEntity.height > ob.y &&
            futureEntity.y < ob.y + ob.height
	);

    });

/*

    game_state.obstacles.forEach(ob => {

	if (
	    ((game_state.player.x + game_state.player.width) > ob.x) &&
	    game_state.player.x < ob.x &&
	    ((game_state.player.y + game_state.player.height) > ob.y &&
	    game_state.player.y < (ob.y + ob.height))
//	    (game_state.player.y + game_state.player.height) < ob.y
	) game_state.player.x = ob.x - game_state.player.width;

	else if (
	    ((game_state.player.y + game_state.player.height) > ob.y) &&
	    game_state.player.y < ob.y &&
	    ((game_state.player.x + game_state.player.width) > ob.x &&
	    game_state.player.x < (ob.x + ob.width))
//	    (game_state.player.x + game_state.player.width) < ob.x
	) game_state.player.y = ob.y - game_state.player.height;

/*
	if (
	    ((game_state.player.x + game_state.player.width) > ob.x) &&
	    game_state.player.x < ob.x &&
	    ((game_state.player.y + game_state.player.height) > ob.y &&
	    game_state.player.y < (ob.y + ob.height))
	) game_state.player.x = ob.x - game_state.player.width;

	if (
	    ((game_state.player.x + game_state.player.width) > ob.x) &&
	    game_state.player.x < ob.x &&
	    ((game_state.player.y + game_state.player.height) > ob.y &&
	    game_state.player.y < (ob.y + ob.height))
	) game_state.player.x = ob.x - game_state.player.width;

    });
*/
}

export default obstacles_collision;
