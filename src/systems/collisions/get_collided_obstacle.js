import game_state from '../../game_state/game_state.js';

function get_collided_obstacle (entity, direction = null) {

    return game_state.obstacles.find(ob => {

        const is_colliding = (entity.x + entity.width >= ob.x &&
                entity.x <= ob.x + ob.width &&
                entity.y + entity.height >= ob.y &&
                entity.y <= ob.y + ob.height);

	if (is_colliding) {

	    const ob_centerX = ob.x + (ob.width / 2);

	    const ob_centerY = ob.y + (ob.height / 2);

	    const entity_centerX = entity.x + (entity.width / 2);

	    const entity_centerY = entity.y + (entity.height / 2);


	    if (direction === 'left') return ob_centerX < entity_centerX;

	    if (direction === 'right') return ob_centerX > entity_centerX;

	    if (direction === 'up') return ob_centerY < entity_centerY;

	    if (direction === 'down') return ob_centerY > entity_centerY;

	    return true;

	} else {return false}

    });
}

export default get_collided_obstacle;
