
import game_state from '../../game_state/game_state.js';
import move_entity from './move_entity.js';
import get_tile_at_position from '../collisions/get_tile_at_position.js';

// Reconstrói o caminho encontrado pelo BFS
function reconstruct_path(parent_map, target_key, start_key) {
    const path = [];
    let current = target_key;

    while (current !== start_key) {
        const parent = parent_map.get(current);

        if (!parent) return [];

        const [row, col] = current.split(',').map(Number);

        path.push({ row, col });

        current = parent;
    }

    return path.reverse();
}

function run_pathfinding(entity) {
    const map = game_state.map;

    const tile_size = map.tile_size;
    const layout = map.layout;

    const max_rows = map.rows;
    const max_cols = map.cols;

    const solids = game_state.solid_tiles;

    if (!entity.target_area) return;

    if (!tile_size || !layout || !max_rows || !max_cols) return;

    // ==========================================
    // 1. CONFIGURAÇÃO
    // ==========================================

    const tolerance = entity.velocity + 1;
    const epsilon = 0.001;

    const start_row = Math.floor(
        (entity.y + entity.height / 2) / tile_size
    );

    const start_col = Math.floor(
        (entity.x + entity.width / 2) / tile_size
    );

    const target_row = Math.floor(
        (entity.target_area.y + entity.target_area.height / 2) / tile_size
    );

    const target_col = Math.floor(
        (entity.target_area.x + entity.target_area.width / 2) / tile_size
    );

    const start_key = `${start_row},${start_col}`;
    const target_key = `${target_row},${target_col}`;

    // ==========================================
    // 2. VERIFICAÇÃO DO BOUNDING BOX
    // ==========================================

    function is_solid_position(x, y) {
        const tile = get_tile_at_position(x, y);

        if (
            tile.row < 0 ||
            tile.row >= max_rows ||
            tile.col < 0 ||
            tile.col >= max_cols
        ) {
            return true;
        }

        return solids.includes(tile.type);
    }

    function can_occupy_position(x, y) {
        const right = x + entity.width - epsilon;
        const bottom = y + entity.height - epsilon;

        const corners = [
            [x, y],
            [right, y],
            [x, bottom],
            [right, bottom]
        ];

        for (const [corner_x, corner_y] of corners) {
            if (is_solid_position(corner_x, corner_y)) {
                return false;
            }
        }

        const first_col = Math.floor(x / tile_size);
        const last_col = Math.floor(right / tile_size);

        const first_row = Math.floor(y / tile_size);
        const last_row = Math.floor(bottom / tile_size);

        for (let row = first_row; row <= last_row; row++) {
            for (let col = first_col; col <= last_col; col++) {
                const sample_x = col * tile_size + tile_size / 2;
                const sample_y = row * tile_size + tile_size / 2;

                if (is_solid_position(sample_x, sample_y)) {
                    return false;
                }
            }
        }

        return true;
    }

    function can_occupy_tile(row, col) {
        const x =
            col * tile_size +
            (tile_size - entity.width) / 2;

        const y =
            row * tile_size +
            (tile_size - entity.height) / 2;

        return can_occupy_position(x, y);
    }

    // ==========================================
    // 3. VALIDAÇÃO DO DESTINO
    // ==========================================

    if (!can_occupy_tile(target_row, target_col)) {
        entity.target_area.path = [];
        return;
    }

    const destination_x =
        target_col * tile_size +
        (tile_size - entity.width) / 2;

    const destination_y =
        target_row * tile_size +
        (tile_size - entity.height) / 2;

    if (start_key === target_key) {
        const aligned =
            Math.abs(entity.x - destination_x) <= tolerance &&
            Math.abs(entity.y - destination_y) <= tolerance;

        entity.last_target_key = target_key;

        if (aligned) {
            entity.target_area.path = [];
            return;
        }

        entity.target_area.path = [
            { row: target_row, col: target_col }
        ];
    }

    // ==========================================
    // 4. PLANEJAMENTO - BFS
    // ==========================================

    const path = entity.target_area.path;

    const needs_recalculation =
        !Array.isArray(path) ||
        path.length === 0 ||
        entity.last_target_key !== target_key;

    if (needs_recalculation) {
        entity.last_target_key = target_key;
        entity.target_area.path = [];

        if (!can_occupy_position(entity.x, entity.y)) return;

        const queue = [[start_row, start_col]];

        let queue_index = 0;

        const visited = new Set([start_key]);
        const parent_map = new Map();

        const directions = [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1]
        ];

        let found = false;

        while (queue_index < queue.length) {
            const [curr_row, curr_col] = queue[queue_index++];

            const curr_key = `${curr_row},${curr_col}`;

            if (curr_key === target_key) {
                found = true;
                break;
            }

            for (const [d_row, d_col] of directions) {
                const next_row = curr_row + d_row;
                const next_col = curr_col + d_col;

                const next_key = `${next_row},${next_col}`;

                if (
                    next_row < 0 ||
                    next_row >= max_rows ||
                    next_col < 0 ||
                    next_col >= max_cols
                ) continue;

                if (visited.has(next_key)) continue;

                if (!can_occupy_tile(next_row, next_col)) continue;

                visited.add(next_key);
                parent_map.set(next_key, curr_key);

                queue.push([next_row, next_col]);
            }
        }

        if (found) {
            entity.target_area.path = reconstruct_path(
                parent_map,
                target_key,
                start_key
            );
        }
    }

    // ==========================================
    // 5. EXECUÇÃO - MOVIMENTO DIAGONAL
    // ==========================================

    const current_path = entity.target_area.path;

    if (!current_path || current_path.length === 0) return;

    // Descobre o ponto mais distante que pode ser alcançado
    // diretamente em linha reta dentro do caminho calculado.
    let waypoint = current_path[0];

    for (let i = current_path.length - 1; i >= 0; i--) {
        const candidate = current_path[i];

        const candidate_x =
            candidate.col * tile_size +
            (tile_size - entity.width) / 2;

        const candidate_y =
            candidate.row * tile_size +
            (tile_size - entity.height) / 2;

        const distance = Math.max(
            Math.abs(candidate_x - entity.x),
            Math.abs(candidate_y - entity.y)
        );

        const steps = Math.ceil(distance / Math.max(1, entity.velocity));

        let safe = true;

        // Verifica a trajetória diagonal em pequenos intervalos.
        for (let step = 1; step <= steps; step++) {
            const progress = step / steps;

            const test_x =
                entity.x + (candidate_x - entity.x) * progress;

            const test_y =
                entity.y + (candidate_y - entity.y) * progress;

            if (!can_occupy_position(test_x, test_y)) {
                safe = false;
                break;
            }
        }

        if (safe) {
            waypoint = candidate;
            break;
        }
    }

    const target_x =
        waypoint.col * tile_size +
        (tile_size - entity.width) / 2;

    const target_y =
        waypoint.row * tile_size +
        (tile_size - entity.height) / 2;

    const diff_x = target_x - entity.x;
    const diff_y = target_y - entity.y;

    // Chegada ao waypoint
    if (
        Math.abs(diff_x) <= tolerance &&
        Math.abs(diff_y) <= tolerance
    ) {
        entity.x = target_x;
        entity.y = target_y;

        // Remove todos os nós percorridos até o waypoint
        const waypoint_index = current_path.indexOf(waypoint);

        if (waypoint_index !== -1) {
            current_path.splice(0, waypoint_index + 1);
        }

        return;
    }

    // Determina os dois eixos independentemente
    const horizontal_direction =
        Math.abs(diff_x) > tolerance
            ? (diff_x > 0 ? 'right' : 'left')
            : null;

    const vertical_direction =
        Math.abs(diff_y) > tolerance
            ? (diff_y > 0 ? 'down' : 'up')
            : null;

    // Verifica se a diagonal é segura para o próximo movimento.
    const velocity = entity.velocity;

    const next_x =
        entity.x +
        (horizontal_direction === 'right' ? velocity :
         horizontal_direction === 'left' ? -velocity : 0);

    const next_y =
        entity.y +
        (vertical_direction === 'down' ? velocity :
         vertical_direction === 'up' ? -velocity : 0);

    const diagonal_safe =
        horizontal_direction &&
        vertical_direction &&
        can_occupy_position(next_x, next_y);

    if (diagonal_safe) {
        move_entity(entity, horizontal_direction);
        move_entity(entity, vertical_direction);
    } else {
        // Se a diagonal não for segura, tenta os eixos separadamente.
        if (
            horizontal_direction &&
            can_occupy_position(next_x, entity.y)
        ) {
            move_entity(entity, horizontal_direction);
        }

        if (
            vertical_direction &&
            can_occupy_position(entity.x, next_y)
        ) {
            move_entity(entity, vertical_direction);
        }
    }
}

export default run_pathfinding;

