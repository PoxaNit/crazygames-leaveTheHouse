import game_state from './game_state.js';

function init_map_physics() {

    const layout = game_state.map.layout;
    const tile_size = game_state.map.tile_size;

    // Garante que o array está limpo antes de popular
    game_state.obstacles = [];

    // r = row (linha), c = column (coluna)
    for (let r = 0; r < game_state.map.rows; r++) {
        for (let c = 0; c < game_state.map.cols; c++) {
            // Se o número for 1, injeta um obstáculo sólido para a física ler!
            if (layout[r][c] === 1) {
                game_state.obstacles.push({
                    x: c * tile_size,
                    y: r * tile_size,
                    width: tile_size,
                    height: tile_size
                });
            }
        }
    }

}

export default init_map_physics;
