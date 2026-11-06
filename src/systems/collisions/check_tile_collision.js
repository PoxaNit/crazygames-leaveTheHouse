import game_state from '../../game_state/game_state.js';

/**
 * Verifica se a entidade está pisando em algum tile de um tipo específico.
 * @param {Object} entity - A entidade (ex: jogador) com x, y, width, height.
 * @param {number} tile_type - O número do tile a ser verificado (ex: 4 para chave).
 * @returns {Array|null} Array com os dados dos tiles colididos ou null se nenhum.
 */
function check_tile_collision(entity, tile_type) {
    const tile_size = game_state.map.tile_size;
    const layout = game_state.map.layout;

    // 1. Calcula os limites lógicos do corpo da entidade no Grid do mapa
    const col_left = Math.floor(entity.x / tile_size);
    const col_right = Math.floor((entity.x + entity.width - 1) / tile_size);
    const row_top = Math.floor(entity.y / tile_size);
    const row_bottom = Math.floor((entity.y + entity.height - 1) / tile_size);

    const hit_tiles = [];

    // 2. Varre a submatriz de tiles que o corpo da entidade está interceptando
    for (let row = row_top; row <= row_bottom; row++) {
        for (let col = col_left; col <= col_right; col++) {
            
            // Salvaguarda contra limites do layout do mapa
            if (layout[row] === undefined || layout[row][col] === undefined) continue;

            // Se o tile atual bater com o tipo que estamos caçando (ex: a chave 4)
            if (layout[row][col] === tile_type) {
                hit_tiles.push({
                    row: row,
                    col: col,
                    x: col * tile_size,
                    y: row * tile_size
                });
            }
        }
    }

    // 3. Retorna o array se achou algo, ou null para pular o processamento no frame
    return hit_tiles.length > 0 ? hit_tiles : null;
}

export default check_tile_collision;

