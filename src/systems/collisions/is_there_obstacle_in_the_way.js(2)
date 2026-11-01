import game_state from '../../game_state/game_state.js';

function check_ray_path(start_row, start_col, target_row, target_col, specific_direction, entity, tile_size, layout, max_rows, max_cols) {
    const d_row = Math.abs(target_row - start_row);
    const d_col = Math.abs(target_col - start_col);
    
    const step_row = start_row < target_row ? 1 : -1;
    const step_col = start_col < target_col ? 1 : -1;

    let current_row = start_row;
    let current_col = start_col;
    let movement_type = (specific_direction === 'up' || specific_direction === 'down') ? 'vertical' : 'horizontal';

    while (current_row !== target_row || current_col !== target_col) {
        if (specific_direction === null) {
            if (current_row !== target_row && (current_col === target_col || d_row > d_col)) {
                current_row += step_row;
                movement_type = 'vertical';
            } else if (current_col !== target_col) {
                current_col += step_col;
                movement_type = 'horizontal';
            }
        } else {
            if (specific_direction === 'up' || specific_direction === 'down') current_row += step_row;
            if (specific_direction === 'left' || specific_direction === 'right') current_col += step_col;
        }

        if (current_row < 0 || current_row >= max_rows || current_col < 0 || current_col >= max_cols) {
            break;
        }

        if (layout[current_row][current_col] === 1) {
            if (movement_type === 'vertical') {
                let left_escape_col = current_col;
                while (left_escape_col >= 0 && layout[current_row][left_escape_col] === 1) left_escape_col--;
                if (left_escape_col < 0) left_escape_col = 0;

                let right_escape_col = current_col;
                while (right_escape_col < max_cols && layout[current_row][right_escape_col] === 1) right_escape_col++;
                if (right_escape_col >= max_cols) right_escape_col = max_cols - 1;

                return {
                    hit: true, axis: 'vertical', row: current_row, col: current_col,
                    x: current_col * tile_size, y: current_row * tile_size,
                    escape_min: left_escape_col, escape_max: right_escape_col
                };
            } else {
                let up_escape_row = current_row;
                while (up_escape_row >= 0 && layout[up_escape_row]?.[current_col] === 1) up_escape_row--;
                if (up_escape_row < 0) up_escape_row = 0;

                let down_escape_row = current_row;
                while (down_escape_row < max_rows && layout[down_escape_row]?.[current_col] === 1) down_escape_row++;
                if (down_escape_row >= max_rows) down_escape_row = max_rows - 1;

                return {
                    hit: true, axis: 'horizontal', row: current_row, col: current_col,
                    x: current_col * tile_size, y: current_row * tile_size,
                    escape_min: up_escape_row, escape_max: down_escape_row
                };
            }
        }
    }
    return null;
}

function is_there_obstacle_in_the_way(entity, specific_direction = null) {
    if (!entity.target_area || !entity.target_area.active) return null;

    const tile_size = game_state.map.tile_size;
    const layout = game_state.map.layout;
    const max_cols = game_state.map.cols;
    const max_rows = game_state.map.rows;

    let target_row = Math.floor((entity.target_area.y + entity.target_area.height / 2) / tile_size);
    let target_col = Math.floor((entity.target_area.x + entity.target_area.width / 2) / tile_size);

    // 🌟 A GRANDE VIRADA DE CHAVE:
    // Se a checagem for vertical (up/down), nós passamos o raio testando a quina ESQUERDA e a quina DIREITA do corpo!
    if (specific_direction === 'up' || specific_direction === 'down') {
        const start_row = Math.floor((entity.y + entity.height / 2) / tile_size);
        const col_left = Math.floor(entity.x / tile_size);
        const col_right = Math.floor((entity.x + entity.width - 1) / tile_size);

        // Testa a quina esquerda
        const res_left = check_ray_path(start_row, col_left, target_row, col_left, specific_direction, entity, tile_size, layout, max_rows, max_cols);
        if (res_left) return res_left;

        // Se a quina esquerda deu livre, testa a quina direita! Enquanto a quina direita ler '1', o obstáculo continua ativo!
        return check_ray_path(start_row, col_right, target_row, col_right, specific_direction, entity, tile_size, layout, max_rows, max_cols);
    }

    // Se a checagem for horizontal (left/right), nós passamos o raio testando o TOPO e a BASE do corpo!
    if (specific_direction === 'left' || specific_direction === 'right') {
        const start_col = Math.floor((entity.x + entity.width / 2) / tile_size);
        const row_top = Math.floor(entity.y / tile_size);
        const row_bottom = Math.floor((entity.y + entity.height - 1) / tile_size);

        const res_top = check_ray_path(row_top, start_col, row_top, target_col, specific_direction, entity, tile_size, layout, max_rows, max_cols);
        if (res_top) return res_top;

        return check_ray_path(row_bottom, start_col, row_bottom, target_col, specific_direction, entity, tile_size, layout, max_rows, max_cols);
    }

    // Fallback padrão usando o centro caso nenhuma direção seja informada
    const start_row_center = Math.floor((entity.y + entity.height / 2) / tile_size);
    const start_col_center = Math.floor((entity.x + entity.width / 2) / tile_size);
    return check_ray_path(start_row_center, start_col_center, target_row, target_col, specific_direction, entity, tile_size, layout, max_rows, max_cols);
}

export default is_there_obstacle_in_the_way;

