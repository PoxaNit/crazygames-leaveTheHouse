import game_state from '../../game_state/game_state.js';
import is_there_obstacle_in_the_way from '../collisions/is_there_obstacle_in_the_way.js';
import target_area_directions from './target_area_directions.js';

function get_around_obstacle (entity) {

    const obstacle = is_there_obstacle_in_the_way(entity);
//console.log('is_there... > obstacle pego: ', obstacle)
    if (obstacle) {
//console.log('inside obstacle: ', obstacle)
	let target_areaCenterX = entity.target_area.x + (entity.target_area.width / 2);
        let target_areaCenterY = entity.target_area.y + (entity.target_area.height / 2);

        let entityCenterX = entity.x + (entity.width / 2);
        let entityCenterY = entity.y + (entity.height / 2);

        let pace = game_state.monster.velocity;

	let directions = target_area_directions(entity);

//console.log('directions: ', directions)

	// rules for each direction

	if (directions.includes('left')) { //console.log('get_around_obstacle includes left')
//console.log('obstacle.right: ', entity.getting_around_obstacle.right)

	    if (
		!(entity.getting_around_obstacle.active && entity.getting_around_obstacle.right) &&
		(((entity.target_area.x + entity.target_area.width) <= obstacle.x) && (entity.x >= (obstacle.x + obstacle.width))) &&
		!((((entity.target_area.y + entity.target_area.height) <= obstacle.y) || (entity.target_area.y >= (obstacle.y + obstacle.height))) &&
		!(((entity.y + entity.height) <= obstacle.y - pace) || (entity.y >= (obstacle.y + obstacle.height + pace))))
	    ) {

//console.log('em get_around_obstacle > left bloco');

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


	        if ((entity.y + entity.height >= (obstacle.y)) && (entity.y <= (obstacle.y + obstacle.height))) return up_side_pixels > down_side_pixels ? 'down' : 'up';

	    }
        }

        else if (directions.includes('right')) { //console.log('get_around_obstacle includes right')

	    if (
		!(entity.getting_around_obstacle.active && entity.getting_around_obstacle.left) &&
		((entity.target_area.x >= (obstacle.x + obstacle.width)) && ((entity.x + entity.width) <= obstacle.x)) &&
		!(((entity.target_area.y + entity.target_area.height) <= obstacle.y) || (entity.target_area.y >= (obstacle.y + obstacle.height))) &&
		!(((entity.y + entity.height) <= obstacle.y - pace) || (entity.y >= (obstacle.y + obstacle.height + pace)))
	    ) {
//console.log('em get_around_obstacle > right bloco');

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


	        if ((entity.y + entity.height >= (obstacle.y)) && (entity.y <= (obstacle.y + obstacle.height))) return up_side_pixels > down_side_pixels ? 'down' : 'up';

	    }

        }

        if (directions.includes('up')) { //console.log('get_around_obstacle includes up')

	    if (
		!(entity.getting_around_obstacle.active && entity.getting_around_obstacle.down) &&
		(((entity.target_area.y + entity.target_area.height) <= obstacle.y) && (entity.y >= (obstacle.y + obstacle.height))) &&
		!((((entity.target_area.x + entity.target_area.width) <= obstacle.x) || (entity.target_area.x >= (obstacle.x + obstacle.width))) &&
		!(((entity.x + entity.width) <= obstacle.x - pace) || (entity.x >= (obstacle.x + obstacle.width + pace))))
	    ) {

//console.log('em get_around_obstacle > up bloco, segundo bloco if deu true: retornando null');return null;
//console.log('em get_around_obstacle > up bloco');

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

	        if ((entity.x + entity.width >= (obstacle.x)) && (entity.x <= (obstacle.x + obstacle.width))) return left_side_pixels > right_side_pixels ? 'right' : 'left';

	    }

        }

        else if (directions.includes('down')) { //console.log('get_around_obstacle includes down')

//console.log('a base do monster é menor que o topo da parede: ', val, ';medidas: entity.y + entity.height: ', entity.y + entity.height, ', obstacle.y: ', obstacle.y);

	    if (
		!(entity.getting_around_obstacle.active && entity.getting_around_obstacle.up) &&
		((entity.target_area.y >= (obstacle.y + obstacle.height)) && ((entity.y + entity.height) <= obstacle.y)) &&
		!((((entity.target_area.x + entity.target_area.width) <= obstacle.x) || (entity.target_area.x >= (obstacle.x + obstacle.width))) && // rvisar: parênteses
		!(((entity.x + entity.width) <= obstacle.x - pace) || (entity.x >= (obstacle.x + obstacle.width + pace))))
	    ) {
//console.log('em get_around_obstacle > down bloco');
//console.log('executando bloco down, get_around_obstacle')
//console.log('!(((entity.x + entity.width) <= obstacle.x - pace) || (entity.x >= (obstacle.x + obstacle.width + pace)))):',!(((entity.x + entity.width) <= obstacle.x - pace) || (entity.x >= (obstacle.x + obstacle.width + pace))))
//console.log('((entity.target_area.y >= (obstacle.y + obstacle.height)) && ((entity.y + entity.height) <= obstacle.y)) (base do monster não passou do topo da parede):', ((entity.target_area.y >= (obstacle.y + obstacle.height)) && ((entity.y + entity.height) <= obstacle.y)))
//console.log('entity.y + emtity.height:', entity.y + entity.height, '; obstacle.y:', obstacle.y)

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


		if ((entity.x + entity.width >= (obstacle.x)) && (entity.x <= (obstacle.x + obstacle.width))) return left_side_pixels > right_side_pixels ? 'right' : 'left';

	    }

        }


    }

    return null;

}

export default get_around_obstacle;
