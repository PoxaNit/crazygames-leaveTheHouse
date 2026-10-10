import game_state from '../../game_state/game_state.js';
import entity_is_in_area from './entity_is_in_area.js';

function obstacles_collision (futureEntity, direction = null) {

    if (direction === 'left') {

	const futureEntity2 = {...futureEntity, x: futureEntity.x - futureEntity.velocity};

	return game_state.obstacles.some(ob => entity_is_in_area(futureEntity2, ob.x, ob.y, ob.width, ob.height));

    }

    if (direction === 'right') {

	const futureEntity2 = {...futureEntity, x: futureEntity.x + futureEntity.velocity};

	return game_state.obstacles.some(ob => entity_is_in_area(futureEntity2, ob.x, ob.y, ob.width, ob.height));

    }

    if (direction === 'up') {

	const futureEntity2 = {...futureEntity, y: futureEntity.y - futureEntity.velocity};

	return game_state.obstacles.some(ob => entity_is_in_area(futureEntity2, ob.x, ob.y, ob.width, ob.height));

    }

    if (direction === 'down') {

	const futureEntity2 = {...futureEntity, y: futureEntity.y + futureEntity.velocity};

	return game_state.obstacles.some(ob => entity_is_in_area(futureEntity2, ob.x, ob.y, ob.width, ob.height));

    }


    return game_state.obstacles.some(ob => entity_is_in_area(futureEntity, ob.x, ob.y, ob.width, ob.height));

}

export default obstacles_collision;
