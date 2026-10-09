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

}

export default obstacles_collision;
