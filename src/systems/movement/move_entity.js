import obstacles_collision from '../collisions/obstacles_collision.js';
import get_collided_obstacle from '../collisions/get_collided_obstacle.js';
import canvas_collision from '../collisions/canvas_collision.js';

const canvas = document.getElementById('gameCanvas');

function move_entity (entity, direction) {

    let futureEntity = {...entity};

    if (direction === 'left') {

	futureEntity.x -= entity.velocity;


	if (canvas_collision(futureEntity)) {entity.x = 0;}


	else if (!obstacles_collision(futureEntity, 'left')) {

	    entity.x = futureEntity.x;

	}

	else {

	    futureEntity.x -= futureEntity.velocity;

	    let ob = get_collided_obstacle(futureEntity, 'left');

	    entity.x = ob.x + ob.width;

	}

    }

    futureEntity = {...entity};

    if (direction === 'up') {

	futureEntity.y -= entity.velocity;


	if (canvas_collision(futureEntity)) {entity.y = 0;}


	else if (!obstacles_collision(futureEntity, 'up')) {

	    entity.y = futureEntity.y;

	}

	else {

	    futureEntity.y -= futureEntity.velocity;

	    let ob = get_collided_obstacle(futureEntity, 'up');

	    entity.y = ob.y + ob.height;

	}

    }

    futureEntity = {...entity};

    if (direction === 'right') {

	futureEntity.x += entity.velocity;


	if (canvas_collision(futureEntity)) {entity.x = canvas.width - entity.width;}


	else if (!obstacles_collision(futureEntity, 'right')) {

	    entity.x = futureEntity.x;

	}

	else {

	    futureEntity.x += futureEntity.velocity;

	    let ob = get_collided_obstacle(futureEntity, 'right');

	    entity.x = ob.x - entity.width;

	}

    }

    futureEntity = {...entity};

    if (direction === 'down') {

	futureEntity.y += entity.velocity;


	if (canvas_collision(futureEntity)) {entity.y = canvas.height - entity.height;}


	else if (!obstacles_collision(futureEntity, 'down')) {

	    entity.y = futureEntity.y;

	}

	else {

	    futureEntity.y += futureEntity.velocity;

	    let ob = get_collided_obstacle(futureEntity, 'down');

	    entity.y = ob.y - entity.height;

	}

    }

}

export default move_entity;
