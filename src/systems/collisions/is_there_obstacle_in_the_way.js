
import game_state from '../../game_state/game_state.js';

function get_obstacle(row, col, tile_size, layout, max_rows, max_cols) {
    if (
        row < 0 ||
        row >= max_rows ||
        col < 0 ||
        col >= max_cols
    ) {
        return null;
    }

    if (layout[row]?.[col] !== 1) {
        return null;
    }

    return {
        hit: true,
        axis: null,
        row,
        col,
        x: col * tile_size,
        y: row * tile_size
    };
}

// Verificação automática original, sem direção especificada.
function check_ray_path(
    start_row,
    start_col,
    target_row,
    target_col,
    tile_size,
    layout,
    max_rows,
    max_cols
) {
    const d_row = Math.abs(target_row - start_row);
    const d_col = Math.abs(target_col - start_col);

    const step_row = start_row < target_row ? 1 : -1;
    const step_col = start_col < target_col ? 1 : -1;

    let current_row = start_row;
    let current_col = start_col;
    let movement_type;

    while (
        current_row !== target_row ||
        current_col !== target_col
    ) {
        if (
            current_row !== target_row &&
            (current_col === target_col || d_row > d_col)
        ) {
            current_row += step_row;
            movement_type = 'vertical';
        } else if (current_col !== target_col) {
            current_col += step_col;
            movement_type = 'horizontal';
        }

        const obstacle = get_obstacle(
            current_row,
            current_col,
            tile_size,
            layout,
            max_rows,
            max_cols
        );

        if (obstacle) {
            obstacle.axis = movement_type;
            return obstacle;
        }

        if (
            current_row < 0 ||
            current_row >= max_rows ||
            current_col < 0 ||
            current_col >= max_cols
        ) {
            break;
        }
    }

    return null;
}

// Verificação direcional considerando todo o corpo da entidade.
function check_directional_path(
    entity,
    target_area,
    direction,
    tile_size,
    layout,
    max_rows,
    max_cols
) {
    const epsilon = 0.000001;

    const entity_left = entity.x;
    const entity_right = entity.x + entity.width;
    const entity_top = entity.y;
    const entity_bottom = entity.y + entity.height;

    const target_left = target_area.x;
    const target_right = target_area.x + target_area.width;
    const target_top = target_area.y;
    const target_bottom = target_area.y + target_area.height;

    const col_left = Math.floor(entity_left / tile_size);
    const col_right = Math.floor(
        (entity_right - epsilon) / tile_size
    );

    const row_top = Math.floor(entity_top / tile_size);
    const row_bottom = Math.floor(
        (entity_bottom - epsilon) / tile_size
    );

    // DOWN: percorre exclusivamente de cima para baixo.
    if (direction === 'down') {
        if (target_top < entity_bottom) {
            return null;
        }

        const first_row =
            Math.floor((entity_bottom - epsilon) / tile_size) + 1;

        const last_row =
            Math.floor((target_top - epsilon) / tile_size);

        for (let row = first_row; row <= last_row; row++) {
            for (let col = col_left; col <= col_right; col++) {
                const obstacle = get_obstacle(
                    row,
                    col,
                    tile_size,
                    layout,
                    max_rows,
                    max_cols
                );

                if (obstacle) {
                    obstacle.axis = 'vertical';
                    return obstacle;
                }
            }
        }

        return null;
    }

    // UP: percorre exclusivamente de baixo para cima.
    if (direction === 'up') {
        if (target_bottom > entity_top) {
            return null;
        }

        const first_row = Math.floor(entity_top / tile_size) - 1;

        const last_row =
            Math.floor((target_bottom - epsilon) / tile_size);

        for (let row = first_row; row >= last_row; row--) {
            for (let col = col_left; col <= col_right; col++) {
                const obstacle = get_obstacle(
                    row,
                    col,
                    tile_size,
                    layout,
                    max_rows,
                    max_cols
                );

                if (obstacle) {
                    obstacle.axis = 'vertical';
                    return obstacle;
                }
            }
        }

        return null;
    }

    // RIGHT: percorre exclusivamente da esquerda para a direita.
    if (direction === 'right') {
        if (target_left < entity_right) {
            return null;
        }

        const first_col =
            Math.floor((entity_right - epsilon) / tile_size) + 1;

        const last_col =
            Math.floor((target_left - epsilon) / tile_size);

        for (let col = first_col; col <= last_col; col++) {
            for (let row = row_top; row <= row_bottom; row++) {
                const obstacle = get_obstacle(
                    row,
                    col,
                    tile_size,
                    layout,
                    max_rows,
                    max_cols
                );

                if (obstacle) {
                    obstacle.axis = 'horizontal';
                    return obstacle;
                }
            }
        }

        return null;
    }

    // LEFT: percorre exclusivamente da direita para a esquerda.
    if (direction === 'left') {
        if (target_right > entity_left) {
            return null;
        }

        const first_col = Math.floor(entity_left / tile_size) - 1;

        const last_col =
            Math.floor((target_right - epsilon) / tile_size);

        for (let col = first_col; col >= last_col; col--) {
            for (let row = row_top; row <= row_bottom; row++) {
                const obstacle = get_obstacle(
                    row,
                    col,
                    tile_size,
                    layout,
                    max_rows,
                    max_cols
                );

                if (obstacle) {
                    obstacle.axis = 'horizontal';
                    return obstacle;
                }
            }
        }

        return null;
    }

    return null;
}

function is_there_obstacle_in_the_way(
    entity,
    specific_direction = null
) {
    if (!entity.target_area || !entity.target_area.active) {
        return null;
    }

    const tile_size = game_state.map.tile_size;
    const layout = game_state.map.layout;
    const max_cols = game_state.map.cols;
    const max_rows = game_state.map.rows;

    const target_row = Math.floor(
        (entity.target_area.y + entity.target_area.height / 2) /
        tile_size
    );

    const target_col = Math.floor(
        (entity.target_area.x + entity.target_area.width / 2) /
        tile_size
    );

    const start_row = Math.floor(
        (entity.y + entity.height / 2) / tile_size
    );

    const start_col = Math.floor(
        (entity.x + entity.width / 2) / tile_size
    );

    // Preserva a memória do obstáculo que está sendo contornado.
    const obstacle = entity.getting_around_obstacle?.obstacle;

    if (obstacle) {
        const obs_row = Math.floor(obstacle.y / tile_size);
        const obs_col = Math.floor(obstacle.x / tile_size);

        if (
            specific_direction === 'up' ||
            specific_direction === 'down'
        ) {
            const overlaps_x =
                entity.x < obstacle.x + obstacle.width &&
                entity.x + entity.width > obstacle.x;

            if (overlaps_x) {
                const entity_col = Math.floor(
                    (entity.x + entity.width / 2) / tile_size
                );

                const entity_left_of_obs = entity_col <= obs_col;
                const target_left_of_obs = target_col <= obs_col;

                if (entity_left_of_obs !== target_left_of_obs) {
                    return {
                        hit: true,
                        axis: 'horizontal',
                        row: obs_row,
                        col: obs_col,
                        x: obstacle.x,
                        y: obstacle.y
                    };
                }
            }
        }

        if (
            specific_direction === 'left' ||
            specific_direction === 'right'
        ) {
            const overlaps_y =
                entity.y < obstacle.y + obstacle.height &&
                entity.y + entity.height > obstacle.y;

            if (overlaps_y) {
                const entity_row = Math.floor(
                    (entity.y + entity.height / 2) / tile_size
                );

                const entity_above_obs = entity_row <= obs_row;
                const target_above_obs = target_row <= obs_row;

                if (entity_above_obs !== target_above_obs) {
                    return {
                        hit: true,
                        axis: 'vertical',
                        row: obs_row,
                        col: obs_col,
                        x: obstacle.x,
                        y: obstacle.y
                    };
                }
            }
        }
    }

    // Verificação direcional.
    if (
        specific_direction === 'up' ||
        specific_direction === 'down' ||
        specific_direction === 'left' ||
        specific_direction === 'right'
    ) {
        return check_directional_path(
            entity,
            entity.target_area,
            specific_direction,
            tile_size,
            layout,
            max_rows,
            max_cols
        );
    }

    // Detecção automática original.
    return check_ray_path(
        start_row,
        start_col,
        target_row,
        target_col,
        tile_size,
        layout,
        max_rows,
        max_cols
    );
}

export default is_there_obstacle_in_the_way;

