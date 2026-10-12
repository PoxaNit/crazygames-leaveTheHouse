import game_state from '../../game_state/game_state.js';
import is_there_obstacle_in_the_way from '../collisions/is_there_obstacle_in_the_way.js';

function get_around_obstacle (entity) {

    const obstacle = is_there_obstacle_in_the_way(entity);

    if (obstacle) {

	let target_areaCenterX = entity.target_area.x + (entity.target_area.width / 2);
        let target_areaCenterY = entity.target_area.y + (entity.target_area.height / 2);

        let entityCenterX = entity.x + (entity.width / 2);
        let entityCenterY = entity.y + (entity.height / 2);

        let pace = game_state.monster.velocity;

	let direction;


        if (Math.abs(entityCenterX - target_areaCenterX) > Math.abs(entityCenterY - target_areaCenterY)) {
            direction = entityCenterX > target_areaCenterX ? 'left' : 'right';
        } else {
            direction = entityCenterY > target_areaCenterY ? 'up' : 'down';
        }


	if (direction === 'left') {

	    if (entity.getting_around_obstacle.active && entity.getting_around_obstacle.right) return null;

	    if (
		!(((entity.target_area.x) <= (obstacle.x + obstacle.width)) && (entity.x >= (obstacle.x + obstacle.width))) ||
		((((entity.target_area.y + entity.target_area.height) <= obstacle.y) || (entity.target_area.y >= (obstacle.y + obstacle.height))) ||
		(((entity.y + entity.height) <= obstacle.y - pace) || (entity.y >= (obstacle.y + obstacle.height + pace))))
	    ) return null;

	    let up_side_pixels = 0;

	    let down_side_pixels = 0;


	    // getting up side pixels

	    up_side_pixels += Math.max(0, (entity.x - (obstacle.x + obstacle.width))); // distance between entity and obstacle

	    up_side_pixels += ((entity.y + entity.height) - obstacle.y); // distance between entity's down extreme and obstacles's up extreme

	    up_side_pixels += obstacle.width; // obstacles's width


	    // absolute distance
	    up_side_pixels += Math.abs(obstacle.y - target_areaCenterY);



	    // getting down side pixels

	    down_side_pixels += Math.max(0, entity.x - (obstacle.x + obstacle.width)); // distance between entity and obstacle

	    down_side_pixels += ((obstacle.y + obstacle.height) - entity.y); // distance between entity's up extreme and obstacles's down extreme

	    down_side_pixels += obstacle.width; // obstacles's width



	    // absolute distance
	    down_side_pixels += Math.abs((obstacle.y + obstacle.height) - target_areaCenterY);


	    if (entity.getting_around_obstacle.active) {

		if (entity.getting_around_obstacle.up) return (down_side_pixels + (pace * 2)) < up_side_pixels ? 'down' : 'up';

		if (entity.getting_around_obstacle.down) return (up_side_pixels + (pace * 2)) < down_side_pixels ? 'up' : 'down';

	    }

	    return up_side_pixels > down_side_pixels ? 'down' : 'up';

        }

        else if (direction === 'right') {

	    if (entity.getting_around_obstacle.active && entity.getting_around_obstacle.left) return null;

	    if (
		!((entity.target_area.x >= (obstacle.x + obstacle.width)) && ((entity.x + entity.width) <= obstacle.x)) ||
		(((entity.target_area.y + entity.target_area.height) <= obstacle.y) || (entity.target_area.y >= (obstacle.y + obstacle.height))) ||
		(((entity.y + entity.height) <= obstacle.y - pace) || (entity.y >= (obstacle.y + obstacle.height + pace)))
	    ) return null;


	    let up_side_pixels = 0;

	    let down_side_pixels = 0;


	    // getting up side pixels

	    up_side_pixels += Math.max(0, (obstacle.x - (entity.x + entity.width))); // distance between entity and obstacle

	    up_side_pixels += ((entity.y + entity.height) - obstacle.y); // distance between entity's down extreme and obstacles's up extreme

	    up_side_pixels += obstacle.width; // obstacles's width


	    // absolute distance
	    up_side_pixels += Math.abs(obstacle.y - target_areaCenterY);



	    // getting down side pixels

	    down_side_pixels += Math.max(0, (obstacle.x - (entity.x + entity.width))); // distance between entity and obstacle

	    down_side_pixels += ((obstacle.y + obstacle.height) - entity.y); // distance between entity's up extreme and obstacles's down extreme

	    down_side_pixels += obstacle.width; // obstacles's width



	    // absolute distance
	    down_side_pixels += Math.abs((obstacle.y + obstacle.height) - target_areaCenterY);


	    if (entity.getting_around_obstacle.active) {

		if (entity.getting_around_obstacle.up) return (down_side_pixels + (pace * 2)) < up_side_pixels ? 'down' : 'up';

		if (entity.getting_around_obstacle.down) return (up_side_pixels + (pace * 2)) < down_side_pixels ? 'up' : 'down';

	    }

	    return up_side_pixels > down_side_pixels ? 'down' : 'up';


        }

        else if (direction === 'up') {

	    if (entity.getting_around_obstacle.active && entity.getting_around_obstacle.down) return null;

	    if (
		!(((entity.target_area.y + entity.target_area.height) <= obstacle.y) && (entity.y <= (obstacle.y + obstacle.height))) ||
		((((entity.target_area.x + entity.target_area.width) <= obstacle.x) || (entity.target_area.x >= (obstacle.x + obstacle.width))) ||
		(((entity.x + entity.width) <= obstacle.x - pace) || (entity.x >= (obstacle.x + obstacle.width + pace))))
	    ) return null;

	    let left_side_pixels = 0;

	    let right_side_pixels = 0;


	    // getting left side pixels

	    left_side_pixels += Math.max(0, (entity.y - (obstacle.y + obstacle.height))); // distance between entity and obstacle

	    left_side_pixels += ((entity.x + entity.width) - obstacle.x); // distance between entity's right extreme and obstacles's left extreme

	    left_side_pixels += obstacle.height; // obstacles's height


	    // absolute distance
	    left_side_pixels += Math.abs(obstacle.x - target_areaCenterX);



	    // getting right side pixels

	    right_side_pixels += Math.max(0, (entity.y - (obstacle.y + obstacle.height))); // distance between entity and obstacle

	    right_side_pixels += ((obstacle.x + obstacle.width) - entity.x); // distance between entity's left extreme and obstacles's right extreme

	    right_side_pixels += obstacle.height; // obstacles's height



	    // absolute distance
	    right_side_pixels += Math.abs((obstacle.x + obstacle.width) - target_areaCenterX);


	    if (entity.getting_around_obstacle.active) {

		if (entity.getting_around_obstacle.left) return (left_side_pixels + (pace * 2)) < right_side_pixels ? 'left' : 'right';

		if (entity.getting_around_obstacle.right) return (right_side_pixels + (pace * 2)) < left_side_pixels ? 'right' : 'left';

	    }

	    return left_side_pixels > right_side_pixels ? 'right' : 'left';


        }

        else if (direction === 'down') {

	    if (entity.getting_around_obstacle.active && entity.getting_around_obstacle.up) return null;

	    if (
		!(((entity.target_area.y >= (obstacle.y + obstacle.height)) && ((entity.y + entity.height) >= obstacle.y))) ||
		((((entity.target_area.x + entity.target_area.width) <= obstacle.x) || (entity.target_area.x >= (obstacle.x + obstacle.width))) ||
		(((entity.x + entity.width) <= obstacle.x - pace) || (entity.x >= (obstacle.x + obstacle.width + pace))))
	    ) return null;

	    let left_side_pixels = 0;

	    let right_side_pixels = 0;


	    // getting left side pixels

	    left_side_pixels += Math.max(0, (obstacle.y - (entity.y + entity.height))); // distance between entity and obstacle

	    left_side_pixels += ((entity.x + entity.width) - obstacle.x); // distance between entity's right extreme and obstacles's left extreme

	    left_side_pixels += obstacle.height; // obstacles's height


	    // absolute distance
	    left_side_pixels += Math.abs(obstacle.x - target_areaCenterX);



	    // getting right side pixels

	    right_side_pixels += Math.max(0, (obstacle.y - (entity.y + entity.height))); // distance between entity and obstacle

	    right_side_pixels += ((obstacle.x + obstacle.width) - entity.x); // distance between entity's left extreme and obstacles's right extreme

	    right_side_pixels += obstacle.height; // obstacles's height



	    // absolute distance
	    right_side_pixels += Math.abs((obstacle.x + obstacle.width) - target_areaCenterX);


	    if (entity.getting_around_obstacle.active) {

		if (entity.getting_around_obstacle.left) return (left_side_pixels + (pace * 2)) < right_side_pixels ? 'left' : 'right';

		if (entity.getting_around_obstacle.right) return (right_side_pixels + (pace * 2)) < left_side_pixels ? 'right' : 'left';

	    }

	    return left_side_pixels > right_side_pixels ? 'right' : 'left';

        }


    }

    return null;

}

export default get_around_obstacle;
