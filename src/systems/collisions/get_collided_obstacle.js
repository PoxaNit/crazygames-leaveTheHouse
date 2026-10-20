import game_state from '../../game_state/game_state.js';
import get_tile_at_position from './get_tile_at_position.js';

function get_collided_obstacle(entity, direction = null) {
    const tile_size = game_state.map.tile_size;
    let check_points = [];

    // Define coordinates shortcut
    const x = entity.x;
    const y = entity.y;
    const w = entity.width;
    const h = entity.height;

    // Direct quina filtering based on movement direction
    if (direction === 'left') {
        check_points = [
            get_tile_at_position(x, y),
            get_tile_at_position(x, y + h - 1)
        ];
    } else if (direction === 'right') {
        check_points = [
            get_tile_at_position(x + w - 1, y),
            get_tile_at_position(x + w - 1, y + h - 1)
        ];
    } else if (direction === 'up') {
        check_points = [
            get_tile_at_position(x, y),
            get_tile_at_position(x + w - 1, y)
        ];
    } else if (direction === 'down') {
        check_points = [
            get_tile_at_position(x, y + h - 1),
            get_tile_at_position(x + w - 1, y + h - 1)
        ];
    } else {
        // Generic check (all 4 corners if no direction provided)
        check_points = [
            get_tile_at_position(x, y),
            get_tile_at_position(x + w - 1, y),
            get_tile_at_position(x, y + h - 1),
            get_tile_at_position(x + w - 1, y + h - 1)
        ];
    }

    // Find the first corner hitting a wall (type 1)
    for (let i = 0; i < check_points.length; i++) {
        const tile = check_points[i];
        if (tile.type === 1) {
            return {
                type: 1,
                row: tile.row,
                col: tile.col,
                x: tile.col * tile_size,
                y: tile.row * tile_size,
                width: tile_size,
                height: tile_size
            };
        }
    }

    return null; // Safe move
}

export default get_collided_obstacle;

