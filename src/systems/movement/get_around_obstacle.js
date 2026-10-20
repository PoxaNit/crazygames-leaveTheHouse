import game_state from '../../game_state/game_state.js';
import is_there_obstacle_in_the_way from '../collisions/is_there_obstacle_in_the_way.js';
import target_area_directions from './target_area_directions.js';

function get_around_obstacle(entity) {
    const tile_size = game_state.map.tile_size;
    const directions = target_area_directions(entity);

    // ----------------------------------------------------
    // HORIZONTAL BARRIERS (Left / Right) -> Evade Up or Down
    // ----------------------------------------------------
    if (directions.includes('left')) {
        const ob = is_there_obstacle_in_the_way(entity, 'left');
        if (ob) {
            const up_y = ob.escape_min * tile_size;
            const down_y = (ob.escape_max + 1) * tile_size; // +1 handles the outer floor edge safely

            const dist_up = Math.abs(entity.y - up_y);
            const dist_down = Math.abs(entity.y - down_y);

            return dist_up < dist_down ? 'up' : 'down';

	}

    }

    else if (directions.includes('right')) {
        const ob = is_there_obstacle_in_the_way(entity, 'right');
        if (ob) {
            const up_y = ob.escape_min * tile_size;
            const down_y = (ob.escape_max + 1) * tile_size; // +1 handles the outer floor edge safely

            const dist_up = Math.abs(entity.y - up_y);
            const dist_down = Math.abs(entity.y - down_y);

            return dist_up < dist_down ? 'up' : 'down';

	}

    }

    // ----------------------------------------------------
    if (directions.includes('up')) {
        const ob = is_there_obstacle_in_the_way(entity, 'up');
        if (ob) {
            const left_x = ob.escape_min * tile_size;
            const right_x = (ob.escape_max + 1) * tile_size;

            const dist_left = Math.abs(entity.x - left_x);
            const dist_right = Math.abs(entity.x - right_x);

            return dist_left < dist_right ? 'left' : 'right';
        }

    }

    else if (directions.includes('down')) {
        const ob = is_there_obstacle_in_the_way(entity, 'down');
        if (ob) {
            const left_x = ob.escape_min * tile_size;
            const right_x = (ob.escape_max + 1) * tile_size;

            const dist_left = Math.abs(entity.x - left_x);
            const dist_right = Math.abs(entity.x - right_x);

            return dist_left < dist_right ? 'left' : 'right';
        }

    }

    return null; // No obstacles blocking the intention, keep natural alignment flow
}

export default get_around_obstacle;

