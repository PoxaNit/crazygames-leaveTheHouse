import game_state from '../../game_state/game_state.js';

function is_there_obstacle_in_the_way(entity, specific_direction = null) {
    if (!entity.target_area || !entity.target_area.active) return null;

    const tile_size = game_state.map.tile_size;
    const layout = game_state.map.layout;
    const max_cols = game_state.map.cols;
    const max_rows = game_state.map.rows;

    // Pega o centro para o traçado do raio principal
    const start_row = Math.floor((entity.y + entity.height / 2) / tile_size);
    const start_col = Math.floor((entity.x + entity.width / 2) / tile_size);

    let target_row = Math.floor((entity.target_area.y + entity.target_area.height / 2) / tile_size);
    let target_col = Math.floor((entity.target_area.x + entity.target_area.width / 2) / tile_size);

    if (specific_direction === 'left' || specific_direction === 'right') target_row = start_row;
    if (specific_direction === 'up' || specific_direction === 'down') target_col = start_col;

    const d_row = Math.abs(target_row - start_row);
    const d_col = Math.abs(target_col - start_col);
    
    const step_row = start_row < target_row ? 1 : -1;
    const step_col = start_col < target_col ? 1 : -1;

    let current_row = start_row;
    let current_col = start_col;
    let hit_direction = 'vertical';

    while (current_row !== target_row || current_col !== target_col) {
        if (current_row !== target_row && (current_col === target_col || d_row > d_col)) {
            current_row += step_row;
            hit_direction = 'vertical';
        } else if (current_col !== target_col) {
            current_col += step_col;
            hit_direction = 'horizontal';
        }

        if (current_row < 0 || current_row >= max_rows || current_col < 0 || current_col >= max_cols) {
            break;
        }

        if (layout[current_row][current_col] === 1) {
            
            // CASO A: Parede bloqueando o eixo Vertical (UP / DOWN)
            if (hit_direction === 'vertical' || specific_direction === 'up' || specific_direction === 'down') {
                let left_escape_col = current_col;
                while (left_escape_col >= 0 && layout[current_row][left_escape_col] === 1) left_escape_col--;
                if (left_escape_col < 0) left_escape_col = 0;

                let right_escape_col = current_col;
                while (right_escape_col < max_cols && layout[current_row][right_escape_col] === 1) right_escape_col++;
                if (right_escape_col >= max_cols) right_escape_col = max_cols - 1;

                // 🌟 A SUA TRAVA DE EIXO CURTA (EIXO X DO MUNDO VS EXTREMOS DO TILEMAP):
                // Se o corpo físico da Amanda já passou completamente da coluna da parede, libera o movimento natural!
                if (entity.x >= (right_escape_col * tile_size) || (entity.x + entity.width) <= ((left_escape_col + 1) * tile_size)) {
                    return null; 
                }

                return {
                    hit: true, axis: 'horizontal', row: current_row, col: current_col,
                    x: current_col * tile_size, y: current_row * tile_size,
                    escape_min: left_escape_col, escape_max: right_escape_col
                };
            } 
            
            // CASO B: Parede bloqueando o eixo Horizontal (LEFT / RIGHT)
            else {
                let up_escape_row = current_row;
                while (up_escape_row >= 0 && layout[up_escape_row]?.[current_col] === 1) up_escape_row--;
                if (up_escape_row < 0) up_escape_row = 0;

                let down_escape_row = current_row;
                while (down_escape_row < max_rows && layout[down_escape_row]?.[current_col] === 1) down_escape_row++;
                if (down_escape_row >= max_rows) down_escape_row = max_rows - 1;

                // 🌟 A SUA TRAVA DE EIXO CURTA (EIXO Y DO MUNDO VS EXTREMOS DO TILEMAP):
                // Se o corpo físico da Amanda já passou completamente da linha da parede, libera o movimento natural!
                if (entity.y >= (down_escape_row * tile_size) || (entity.y + entity.height) <= ((up_escape_row + 1) * tile_size)) {
                    return null;
                }

                return {
                    hit: true, axis: 'vertical', row: current_row, col: current_col,
                    x: current_col * tile_size, y: current_row * tile_size,
                    escape_min: up_escape_row, escape_max: down_escape_row
                };
            }
        }
    }

    return null;
}

export default is_there_obstacle_in_the_way;

