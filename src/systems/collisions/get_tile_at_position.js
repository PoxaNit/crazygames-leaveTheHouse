import game_state from '../../game_state/game_state.js';

function get_tile_at_position(world_x, world_y) {
    const layout = game_state.map.layout;
    const tile_size = game_state.map.tile_size;

    const col = Math.floor(world_x / tile_size);
    const row = Math.floor(world_y / tile_size);

    // Out of bounds check (treat as solid wall)
    if (row < 0 || row >= game_state.map.rows || col < 0 || col >= game_state.map.cols) {
        return { row, col, type: 1 };
    }

    const type = layout[row]?.[col] ?? 1;

    return { row, col, type };
}

export default get_tile_at_position;

