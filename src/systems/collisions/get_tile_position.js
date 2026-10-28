import game_state from '../../game_state/game_state.js';

/**
 * Retorna as coordenadas X e Y em pixels reais do mundo a partir de uma linha e coluna da grade.
 * @param {number} row - A linha do tile na matriz do mapa.
 * @param {number} col - A coluna do tile na matriz do mapa.
 * @returns {Object} { x: number, y: number } - Posição em pixels do canto superior esquerdo do tile.
 */
function get_tile_position(row, col) {
    const tile_size = game_state.map.tile_size;

    return {
        x: col * tile_size,
        y: row * tile_size
    };
}

export default get_tile_position;

